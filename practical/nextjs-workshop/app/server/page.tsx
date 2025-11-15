import NavBar from "@/components/NavBar";
import HouseList from "@/components/HouseList";

async function fetchHouses() {
  const res = await fetch("http://localhost:3000/api/houses", {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch houses");
  }

  return res.json();
}

export default async function ServerPage() {
  const data = await fetchHouses();

  return (
    <>
      <NavBar />
      <h1 className="mb-2 text-2xl font-bold">Server-side Houses</h1>
      <p className="mb-4 text-sm text-slate-300">
        This page fetches data from <code className="rounded bg-slate-800 px-1">/api/houses</code> on
        the <span className="font-semibold">server</span> on every request.
      </p>
      <HouseList houses={data.houses} />
    </>
  );
}
