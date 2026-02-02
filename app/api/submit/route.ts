// app/api/submit/route.ts
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allow all domains (or restrict later)
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Handle OPTIONS preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Handle POST form submissions
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Normalize empty strings to null for Supabase
    const cleanData = {
      name: body.name?.trim() || null,
      email: body.email?.trim() || null,
      phone: body.phone?.trim() || null,
      urgency: body.urgency || null,
      message: body.message?.trim() || null,
    };

    const { error } = await supabase.from("submissions").insert([cleanData]);

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}
