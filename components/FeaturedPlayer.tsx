"use client";

import { useAudioManager } from "@/lib/useAudioManager";
import { audioManager } from "@/lib/audioManager";
import type { SoundtrackMeta } from "@/lib/stories";

export default function FeaturedPlayer({
  soundtrack,
}: {
  soundtrack?: SoundtrackMeta;
}) {
  const state = useAudioManager();

  if (!soundtrack) {
    return (
      <div className="mt-10 border border-white/10 px-5 py-4 text-xs text-ivory-500 lg:mt-0">
        Soundtrack coming soon.
      </div>
    );
  }

  const track = soundtrack;
  const isThisTrack = state.slug !== null; // manager is global/singular
  const isPlaying = isThisTrack && state.isPlaying;

  function handlePlayClick() {
    if (isPlaying) {
      audioManager.pause();
    } else {
      audioManager.loadAndPlay({
        slug: "the-lake",
        title: track.title,
        artist: track.artist,
        file: track.file,
      });
    }
  }

  return (
    <div className="mt-10 flex items-center gap-4 border border-white/10 px-5 py-4 lg:mt-0">
      <button
        type="button"
        onClick={handlePlayClick}
        aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-ivory-100 transition-colors hover:border-white/60"
      >
        {isPlaying ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <rect x="1" y="0.5" width="3.5" height="11" />
            <rect x="7" y="0.5" width="3.5" height="11" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
            <path d="M0 0L12 7L0 14V0Z" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-ivory-100">Play Soundtrack</p>
        <p className="truncate text-xs text-ivory-500">
          {soundtrack.title}
          {soundtrack.durationLabel ? ` · ${soundtrack.durationLabel}` : ""}
        </p>
      </div>

      <input
        type="range"
        className="bq-slider hidden w-24 sm:block"
        min={0}
        max={1}
        step={0.01}
        value={state.volume}
        aria-label="Volume"
        onChange={(e) => audioManager.setVolume(parseFloat(e.target.value))}
      />
    </div>
  );
}
