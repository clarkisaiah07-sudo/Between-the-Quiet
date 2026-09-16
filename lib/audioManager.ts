"use client";

/**
 * Between the Quiet — audio architecture notes
 * --------------------------------------------
 * A single <audio> element lives for the lifetime of the page load and is
 * NOT tied to any one route's React tree. Next.js client-side navigation
 * does not reload the JS runtime, so this module-level singleton survives
 * the transition from a story card (on the homepage / collection page) to
 * the story's own reading page.
 *
 * Why this matters for iOS Safari: Safari only allows starting/resuming
 * playback on an <audio> element inside the call stack of a real user
 * gesture (a click/tap handler), and only if that element has already had
 * .load()/.play() called on it at least once during a gesture. So instead
 * of waiting for the reading page to mount and then trying to autoplay
 * (which Safari blocks), we call play() synchronously inside the onClick
 * handler on the story card — before/while navigation happens. By the time
 * the reading page mounts, the audio is either already playing (common
 * case) or the play() promise rejected, in which case we fall back to a
 * visible Play control rather than fighting the browser.
 */

type Listener = () => void;

export interface PlayerState {
  slug: string | null;
  title: string | null;
  artist: string | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number; // 0–1
  blocked: boolean; // true if autoplay was blocked and needs a manual tap
}

const VOLUME_KEY = "btq:volume";
const DEFAULT_VOLUME = 0.3;

function readStoredVolume(): number {
  if (typeof window === "undefined") return DEFAULT_VOLUME;
  const raw = window.localStorage.getItem(VOLUME_KEY);
  const parsed = raw ? parseFloat(raw) : NaN;
  return Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : DEFAULT_VOLUME;
}

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners = new Set<Listener>();
  private state: PlayerState = {
    slug: null,
    title: null,
    artist: null,
    isPlaying: false,
    isMuted: false,
    volume: DEFAULT_VOLUME,
    blocked: false,
  };

  private ensureAudio(): HTMLAudioElement {
    if (!this.audio && typeof window !== "undefined") {
      this.audio = new Audio();
      this.audio.loop = true;
      this.audio.preload = "auto";
      this.state.volume = readStoredVolume();
      this.audio.volume = this.state.volume;

      this.audio.addEventListener("play", () => this.set({ isPlaying: true, blocked: false }));
      this.audio.addEventListener("pause", () => this.set({ isPlaying: false }));
    }
    return this.audio!;
  }

  getState(): PlayerState {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private set(partial: Partial<PlayerState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((l) => l());
  }

  /**
   * Call this synchronously from the story card's click handler, before
   * navigation. Because it runs inside the click gesture, iOS Safari will
   * allow playback to begin.
   */
  loadAndPlay(track: { slug: string; title: string; artist: string; file: string }) {
    const audio = this.ensureAudio();

    if (this.state.slug !== track.slug) {
      audio.src = track.file;
      audio.currentTime = 0;
    }

    this.set({ slug: track.slug, title: track.title, artist: track.artist });

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        // Autoplay was blocked (e.g. gesture didn't carry through, or this
        // is a fresh tab / direct link). Surface an obvious manual control
        // rather than retrying silently.
        this.set({ blocked: true, isPlaying: false });
      });
    }
  }

  /** Used by the reading page if a visitor arrives without a prior click
   * gesture (e.g. a direct link) — shows a Play control instead of
   * attempting autoplay. */
  prime(track: { slug: string; title: string; artist: string; file: string }) {
    const audio = this.ensureAudio();
    if (this.state.slug !== track.slug) {
      audio.src = track.file;
      audio.pause();
      this.set({
        slug: track.slug,
        title: track.title,
        artist: track.artist,
        isPlaying: false,
        blocked: true,
      });
    }
  }

  play() {
    const audio = this.ensureAudio();
    audio.play().catch(() => this.set({ blocked: true }));
  }

  pause() {
    this.ensureAudio().pause();
  }

  toggle() {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  restart() {
    const audio = this.ensureAudio();
    audio.currentTime = 0;
    this.play();
  }

  setVolume(volume: number) {
    const audio = this.ensureAudio();
    const clamped = Math.min(1, Math.max(0, volume));
    audio.volume = clamped;
    audio.muted = clamped === 0;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(VOLUME_KEY, String(clamped));
    }
    this.set({ volume: clamped, isMuted: clamped === 0 });
  }

  toggleMute() {
    const audio = this.ensureAudio();
    audio.muted = !audio.muted;
    this.set({ isMuted: audio.muted });
  }
}

// Module-level singleton — one instance per page load, shared across routes.
export const audioManager = new AudioManager();
