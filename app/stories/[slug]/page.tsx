import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllStories, getStoryBySlug } from "@/lib/stories";
import ReadingPlayer from "@/components/ReadingPlayer";

export function generateStaticParams() {
  return getAllStories().map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.teaser,
    openGraph: { title: story.title, description: story.teaser },
  };
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug);
  if (!story) notFound();

  const hasText = story.content.length > 0;

  return (
    <article
      className="relative min-h-screen"
      style={{
        backgroundColor: "#0b0a09",
        backgroundImage: `radial-gradient(150% 110% at 50% -5%, ${story.theme.base}48 0%, #0b0a09 60%)`,
        filter: "saturate(0.8) brightness(0.94)",
      }}
    >
      <div className="mx-auto max-w-2xl px-6 pb-32 pt-16 sm:px-8">
        <Link
          href="/"
          className="text-xs uppercase tracking-wide2 text-ivory-500 hover:text-ivory-100"
        >
          &larr; Back to the Collection
        </Link>

        <h1 className="mt-8 font-serif text-4xl italic text-ivory-100 sm:text-5xl">
          {story.title}
        </h1>
        <p className="mt-3 text-ivory-500">{story.teaser}</p>

        <div
          className="mt-8 h-px w-12"
          style={{ backgroundColor: story.theme.accent }}
        />

        {hasText ? (
          <div className="prose prose-invert mt-10 max-w-none font-serif text-lg leading-[1.85] text-ivory-100 prose-p:mb-6">
            {/* Story body renders here once the manuscript is added to
                content/stories/{story.slug}.mdx */}
            {story.content}
          </div>
        ) : (
          <p className="mt-16 italic text-ivory-500">
            {story.status === "unfinished"
              ? "This story is still being written."
              : "The full text hasn't been added yet."}
          </p>
        )}
      </div>

      {story.soundtrack && (
        <ReadingPlayer slug={story.slug} soundtrack={story.soundtrack} />
      )}
    </article>
  );
}
