import { getAllStories, getFeaturedStory } from "@/lib/stories";
import StoryCard from "@/components/StoryCard";
import FeaturedPlayer from "@/components/FeaturedPlayer";

export default function HomePage() {
  const stories = getAllStories();
  const featured = getFeaturedStory();
  const collection = stories.filter((s) => s.slug !== featured.slug);

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-white/10"
        style={{
          backgroundImage: `radial-gradient(90% 120% at 75% -10%, ${featured.theme.base} 0%, #0a0a0a 65%)`,
        }}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.3fr_1px_1fr]">
          <div>
            <p className="text-xs tracking-wide2 text-ivory-500">
              Featured Story
            </p>
            <h1 className="mt-4 font-serif text-6xl leading-[1.05] text-ivory-100 sm:text-7xl">
              {featured.title}
            </h1>
            <p className="mt-6 max-w-md font-serif text-xl italic text-ivory-300">
              {featured.teaser}
            </p>
            <div className="mt-10">
              {featured.status === "unfinished" ? (
                <span className="inline-block border border-white/20 px-6 py-3 text-sm text-ivory-500">
                  This story is still being written
                </span>
              ) : (
                <a
                  href={`/stories/${featured.slug}`}
                  className="inline-block border border-white/20 px-6 py-3 text-sm text-ivory-100 transition-colors hover:border-white/40"
                >
                  Read the Story &rarr;
                </a>
              )}
            </div>
          </div>

          <div className="hidden bg-white/10 lg:block" aria-hidden="true" />

          <div className="flex flex-col justify-between">
            <blockquote className="font-serif text-3xl italic leading-snug text-ivory-100">
              &ldquo;Still water remembers.&rdquo;
            </blockquote>
            <FeaturedPlayer soundtrack={featured.soundtrack ?? undefined} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="text-center">
          <p className="text-xs tracking-wide2 text-ivory-500">
            The Collection
          </p>
          <p className="mt-4 font-serif text-xl italic text-ivory-300">
            Stories of what hides, what waits, and what never really leaves.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {collection.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 py-16 text-center">
        <blockquote className="font-serif text-2xl italic text-ivory-100">
          &ldquo;There are stories we tell, and stories that tell us.&rdquo;
        </blockquote>
      </section>
    </>
  );
}
