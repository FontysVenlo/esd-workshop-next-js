import { NextResponse } from "next/server";

let houses = [
  { id: 1, name: "Starter Apartment", rooms: 2, type: "Apartment" },
  { id: 2, name: "Family Home", rooms: 5, type: "Detached" },
];

export async function GET() {
  return NextResponse.json({ houses });
}

export async function POST(req: Request) {
  const body = await req.json();

  const newHouse = {
    id: Date.now(),
    name: body.name ?? "Unnamed",
    rooms: Number(body.rooms ?? 1),
    type: body.type ?? "Unknown",
  };

  houses.push(newHouse);

  return NextResponse.json({ house: newHouse }, { status: 201 });
}
