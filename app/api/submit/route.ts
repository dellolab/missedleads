import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    const { name, email, phone, urgency, message } = body;
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase.from("submissions").insert([
      { name, email, phone, urgency, message }
    ]);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, submission: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Submit API error:", err);
    return new Response(JSON.stringify({ error: "Failed to submit inquiry" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
