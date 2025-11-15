import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="mb-8 flex items-center gap-4 border-b border-slate-800 pb-4 text-sm font-medium">
      <Link href="/" className="rounded-full px-3 py-1 hover:bg-slate-800">
        Home
      </Link>
      <Link href="/server" className="rounded-full px-3 py-1 hover:bg-slate-800">
        Server-side Houses
      </Link>
      <Link href="/client" className="rounded-full px-3 py-1 hover:bg-slate-800">
        Client-side Houses
      </Link>
    </nav>
  );
}
