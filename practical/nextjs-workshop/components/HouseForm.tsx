"use client";

import { useState } from "react";
import { House } from "./HouseList";

export default function HouseForm({
  onHouseCreated
}: {
  onHouseCreated: (house: House) => void;
}) {
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState(3);
  const [type, setType] = useState("Apartment");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // TODO: Students implement this in the workshop
    // Example (leave commented for the exercise):
    //
    // setLoading(true);
    // const res = await fetch("/api/houses", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, rooms, type })
    // });
    // const data = await res.json();
    // onHouseCreated(data.house);
    // setName("");
    // setRooms(3);
    // setType("Apartment");
    // setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
    >
      <h3 className="text-base font-semibold">Add a House (Client-side)</h3>

      <label className="text-sm">
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
        />
      </label>

      <label className="text-sm">
        Rooms
        <input
          type="number"
          min={1}
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
        />
      </label>

      <label className="text-sm">
        Type
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
        >
          <option>Apartment</option>
          <option>Detached</option>
          <option>Semi-detached</option>
          <option>Villa</option>
        </select>
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        className="mt-1 w-fit rounded-full bg-sky-500 px-4 py-2 text-sm text-slate-900"
      >
        {loading ? "Saving..." : "Save House"}
      </button>
    </form>
  );
}
