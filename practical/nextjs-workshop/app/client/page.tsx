"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import HouseList from "@/components/HouseList";
import HouseForm from "@/components/HouseForm";

export default function ClientPage() {
  const [houses, setHouses] = useState([]);
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

  function handleHouseCreated(newHouse) {
    setHouses((prev) => [...prev, newHouse]);
  }

  return (
    <>
      <NavBar />
      <h1 className="mb-2 text-2xl font-bold">Client-side Houses</h1>
      <p className="mb-4 text-sm text-slate-300">
        This page fetches data from{" "}
        <code className="rounded bg-slate-800 px-1">/api/houses</code> in the{" "}
        <span className="font-semibold">browser</span> and lets you add new houses from the client.
      </p>

      <HouseForm onHouseCreated={handleHouseCreated} />

      {loading ? (
        <p className="text-sm text-slate-400">Loading houses...</p>
      ) : (
        <HouseList houses={houses} />
      )}
    </>
  );
}
