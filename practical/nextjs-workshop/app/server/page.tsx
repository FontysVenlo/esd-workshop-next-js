import NavBar from "@/components/NavBar";
import HouseList, { House } from "@/components/HouseList";

async function fetchHouses(): Promise<{ houses: House[] }> {
  const res = await fetch("http://localhost:3000/api/houses", {
    cache: "no-store"
  });
  return res.json();
}

export default async function ServerPage() {
  const data = await fetchHouses();

  return (
    <>
      <NavBar />
      <h1 className="mb-3 text-xl font-bold">Server-side Houses</h1>
      <HouseList houses={data.houses} />
    </>
  );
}
