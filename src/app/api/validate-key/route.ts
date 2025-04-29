import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ message: 'API key is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("api_keys")
      .select("id")
      .eq("key", apiKey)
      .single();

    if (error || !data) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ valid: false, error: "Server error" }, { status: 500 });
  }
}