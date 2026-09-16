import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
];

export default function SiteHeader() {
  return (
    <header className="relative z-10 border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="group">
          <div className="font-serif text-2xl italic tracking-wide text-ivory-100">
            Between the Quiet
          </div>
          <p className="mt-1 text-xs italic text-ivory-500">
            Stories for the places darkness lingers.
          </p>
        </Link>

        <nav className="hidden gap-8 text-sm text-ivory-300 sm:flex">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                i === 0
                  ? "border-b border-rust-500 pb-1 text-ivory-100"
                  : "pb-1 transition-colors hover:text-ivory-100"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
