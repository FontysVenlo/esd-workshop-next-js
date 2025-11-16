import { NextResponse } from "next/server";
import { houses } from "./data";

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
    city: body.city ?? "Unknown",
  };

  houses.push(newHouse);

  return NextResponse.json({ house: newHouse }, { status: 201 });
}
