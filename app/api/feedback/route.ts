import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Server-side Supabase client with service_role key (bypasses RLS)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();

        console.log("API Route - Received payload:", payload);

        const { data, error } = await supabaseAdmin
            .from('feedback_entries')
            .insert([payload])
            .select();

        if (error) {
            console.error("API Route - Supabase Error:", error);
            return NextResponse.json(
                { error: error.message, code: error.code, details: error.details },
                { status: 400 }
            );
        }

        console.log("API Route - Successfully saved:", data);
        return NextResponse.json({ success: true, data });

    } catch (err) {
        console.error("API Route - Unexpected error:", err);
        return NextResponse.json(
            { error: "Error inesperado en el servidor" },
            { status: 500 }
        );
    }
}
