// app/server/[id]/page.tsx
import NavBar from "@/components/NavBar";
import type { House } from "@/components/HouseList";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function fetchHouse(id: string): Promise<House> {
  const res = await fetch("http://localhost:3000/api/houses", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch houses");
    notFound();
  }

  const data = await res.json();

  const house = (data.houses as House[]).find(
    (h) => String(h.id) === String(id)
  );

  if (!house) {
    notFound();
  }

  return house;
}

export default async function HouseDetailPage(props: PageProps) {
  const { id } = await props.params; // 👈 important: await params
  const house = await fetchHouse(id);

  return (
    <>
      <NavBar />

      <main className="mx-auto mt-6 max-w-3xl px-4 pb-10">
        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/server"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
          >
            <span aria-hidden="true">←</span>
            Back to houses
          </Link>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
          <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                {house.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {house.city ?? "Unknown"}
              </p>
            </div>

            <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              {house.type}
            </span>
          </header>

          <div className="grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Rooms
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {house.rooms}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                City
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {house.city ?? "Unknown"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Type
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                {house.type}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
