import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <div className="font-serif text-lg italic text-ivory-100">
            Between the Quiet
          </div>
          <p className="mt-1 text-xs italic text-ivory-500">
            Stories for the places darkness lingers.
          </p>
        </div>
        <nav className="flex gap-6 text-sm text-ivory-500">
          <Link href="/" className="hover:text-ivory-100">
            Home
          </Link>
          <Link href="/stories" className="hover:text-ivory-100">
            Stories
          </Link>
          <Link href="/about" className="hover:text-ivory-100">
            About
          </Link>
          <Link href="/journal" className="hover:text-ivory-100">
            Journal
          </Link>
          <Link href="/music" className="hover:text-ivory-100">
            Music Credits
          </Link>
        </nav>
      </div>
    </footer>
  );
}
