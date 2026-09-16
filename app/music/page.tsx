import { getAllStories } from "@/lib/stories";

export const metadata = { title: "Music Credits" };

export default function MusicCreditsPage() {
  const tracks = getAllStories()
    .filter((s) => s.soundtrack)
    .map((s) => ({ story: s.title, ...s.soundtrack! }));

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 sm:px-10">
      <p className="text-xs tracking-wide2 text-ivory-500">Music Credits</p>
      <h1 className="mt-4 font-serif text-4xl italic text-ivory-100">
        Soundtrack Attribution
      </h1>
      <p className="mt-6 text-ivory-500">
        Every soundtrack on this site is either CC0, public-domain, or used
        under a free-use license that permits it, with attribution given
        below where required.
      </p>

      {tracks.length === 0 ? (
        <p className="mt-12 italic text-ivory-500">
          No soundtracks have been added yet.
        </p>
      ) : (
        <ul className="mt-12 space-y-8">
          {tracks.map((t) => (
            <li key={t.title} className="border-t border-white/10 pt-6">
              <p className="font-serif text-xl italic text-ivory-100">
                {t.title}
              </p>
              <p className="mt-1 text-sm text-ivory-500">
                {t.artist} · used in &ldquo;{t.story}&rdquo;
              </p>
              <p className="mt-2 text-sm text-ivory-500">
                Source:{" "}
                <a href={t.sourceUrl} className="underline hover:text-ivory-100">
                  {t.source}
                </a>
              </p>
              <p className="mt-1 text-sm text-ivory-500">
                License:{" "}
                <a href={t.licenseUrl} className="underline hover:text-ivory-100">
                  {t.license}
                </a>
              </p>
              {t.attributionRequired && t.attributionText && (
                <p className="mt-2 text-sm italic text-ivory-500">
                  {t.attributionText}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
