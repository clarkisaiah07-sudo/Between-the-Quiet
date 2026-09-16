import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type StoryStatus = "published" | "unfinished";

export interface StoryTheme {
  /** Primary atmosphere color, used for gradients/cards */
  base: string;
  /** Secondary tone for gradient depth */
  deep: string;
  /** Accent used sparingly (borders, highlights) within this story's world */
  accent: string;
}

export interface SoundtrackMeta {
  title: string;
  artist: string;
  source: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  attributionRequired: boolean;
  attributionText?: string;
  file: string; // path under /public/audio
  durationLabel?: string;
}

export interface StoryMeta {
  title: string;
  slug: string;
  status: StoryStatus;
  teaser: string;
  order: number;
  theme: StoryTheme;
  featured?: boolean;
  publicationDate?: string;
  soundtrack?: SoundtrackMeta | null;
}

export interface Story extends StoryMeta {
  content: string; // raw markdown/mdx body (empty for unfinished stories)
}

const STORIES_DIR = path.join(process.cwd(), "content", "stories");

export function getAllStories(): Story[] {
  const files = fs.readdirSync(STORIES_DIR).filter((f) => f.endsWith(".mdx"));

  const stories = files.map((filename) => {
    const filePath = path.join(STORIES_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    return { ...(data as StoryMeta), content: content.trim() };
  });

  return stories.sort((a, b) => a.order - b.order);
}

export function getStoryBySlug(slug: string): Story | undefined {
  return getAllStories().find((s) => s.slug === slug);
}

export function getFeaturedStory(): Story {
  const stories = getAllStories();
  return stories.find((s) => s.featured) ?? stories[0];
}
