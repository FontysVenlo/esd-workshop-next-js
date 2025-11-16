// app/api/houses/[id]/route.ts
import { NextResponse } from "next/server";
import { houses } from "../houses/data";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.id);
  const house = houses.find((h) => h.id === id);

  if (!house) {
    return NextResponse.json({ error: "House not found" }, { status: 404 });
  }

  return NextResponse.json({ house });
}
