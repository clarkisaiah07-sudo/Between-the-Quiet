import { getAllStories } from "@/lib/stories";
import StoryCard from "@/components/StoryCard";

export const metadata = { title: "Stories" };

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <div className="text-center">
        <p className="text-xs tracking-wide2 text-ivory-500">The Collection</p>
        <p className="mt-4 font-serif text-xl italic text-ivory-300">
          Stories of what hides, what waits, and what never really leaves.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>
    </section>
  );
}
