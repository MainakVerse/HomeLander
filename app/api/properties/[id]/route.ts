import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const rows = await sql`
    SELECT id, title, location, latitude, longitude, price, tags
    FROM properties
    WHERE id = ${id}::uuid
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}
