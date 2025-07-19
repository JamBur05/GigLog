// src/app/api/clerk-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.type !== "user.created") {
    return NextResponse.json(
      { message: "Not a user.created event" },
      { status: 200 }
    );
  }

  const { id, email_addresses, username } = body.data;
  const email = email_addresses?.[0]?.email_address;

  const { error } = await supabase.from("Users").insert({
    userID: id,
    email,
    username,
  });

  if (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { error: "Database insert failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
