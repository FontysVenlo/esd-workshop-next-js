export interface House {
    id: number;
    name: string;
    rooms: number;
    type: string;
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
      <ul className="grid gap-4">
        {houses.map((house) => (
          <li
            key={house.id}
            className="rounded-2xl border border-slate-800 bg-sky-100 p-4 shadow-sm"
          >
            <h3 className="mb-1 text-lg font-semibold">{house.name}</h3>
            <p className="text-sm">Rooms: {house.rooms}</p>
            <p className="text-xs">Type: {house.type}</p>
          </li>
        ))}
      </ul>
    );
  }
  