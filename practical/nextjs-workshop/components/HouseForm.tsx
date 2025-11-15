"use client";

// TODO 4: Complete this form so that it calls the /api/houses endpoint
// from the client and updates the list in the Client-side page.

import { useState } from "react";

export default function HouseForm({ onHouseCreated }) {
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState(3);
  const [type, setType] = useState("Apartment");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // TODO 4.1: Implement the POST call to /api/houses
    // Hint: use fetch("/api/houses", { method: "POST", body: JSON.stringify({...}), headers: {"Content-Type": "application/json"} })

    // TODO 4.2: On success, clear the form and call onHouseCreated(newHouse)
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
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          placeholder="Cozy Cottage"
        />
      </label>

      <label className="text-sm">
        Rooms
        <input
          type="number"
          min={1}
          max={20}
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
      </label>

      <label className="text-sm">
        Type
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
        disabled={loading}
        className="mt-1 inline-flex w-fit items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save House"}
      </button>
    </form>
  );
}
