import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
    const cookiesStore = await cookies();

    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

    return createServerClient(
        supabaseUrl!,
        supabaseKey!,
        {
            cookies: {
                getAll() {
                    return cookiesStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookiesStore.set(name, value, options)
                        )
                    } catch {
                      
                    }
                },
            },
        }
    )
}