"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import HouseList, { House } from "@/components/HouseList";
import HouseForm from "@/components/HouseForm";

export default function ClientPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/houses");
      const data = await res.json();
      setHouses(data.houses);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <NavBar />
      <h1 className="mb-3 text-xl font-bold">Client-side Houses</h1>

      <HouseForm onHouseCreated={(h) => setHouses((prev) => [...prev, h])} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <HouseList houses={houses} />
      )}
    </>
  );
}
