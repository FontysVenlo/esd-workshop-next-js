import Link from "next/link";

export interface House {
    id: number;
    name: string;
    rooms: number;
    type: string;
    city: string;
  }
  
  export default function HouseList({ houses }: { houses: House[] }) {
    if (!houses || houses.length === 0) {
      return (
        <p className="text-sm text-slate-400">
          No houses yet. Try adding some.
        </p>
      );
    }
  

    return (
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {houses.map((house) => (
          <li
            key={house.id}
            className="group rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-within:ring-2 focus-within:ring-sky-500"
          >
            <Link href={`/server/${house.id}`} className="block focus:outline-none">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-900">
                  {house.name}
                </h3>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  {house.type}
                </span>
              </div>
  
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {house.city ?? "Unknown"}
                </span>
                <span className="text-sm font-medium text-slate-900">
                  {house.rooms} rooms
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  