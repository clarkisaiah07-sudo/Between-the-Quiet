export const metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 sm:px-10">
      <p className="text-xs tracking-wide2 text-ivory-500">Journal</p>
      <h1 className="mt-4 font-serif text-4xl italic text-ivory-100">
        Notes from the quiet
      </h1>
      <p className="mt-8 italic text-ivory-500">
        No entries yet. This is where occasional writing notes or updates can
        go later.
      </p>
    </section>
  );
}
