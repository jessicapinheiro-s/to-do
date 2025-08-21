import { createBrowserClient } from "@supabase/ssr";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

console.log(
    {
        cliente: {
            supabaseKey: supabaseKey,
            supabaseUrl: supabaseUrl
        }
    }
)

export const supabase = createBrowserClient(
    supabaseUrl!,
    supabaseKey!
);