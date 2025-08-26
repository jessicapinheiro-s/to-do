"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

interface propsAuth {
    type: string;
    email: string;
    password: string;
}

export const authUser = async (props: propsAuth) => {

    const { type, email, password } = props;

    const supabase = await createClient();

    const { data, error: authError } = type === 'login' ? await supabase.auth.signInWithPassword({
        email,
        password
    }) :
        await supabase.auth.signUp({
            email,
            password
        });

    if (authError) {
        redirect('/error');
    } else {
        if (data.user) {
            const { id } = data.user;

            if (type !== 'login') {
                const { error: profileError } = await supabase.from('profiles').insert({
                    id,
                    full_name: '',
                    username_website: '',
                    avatar_url: ''
                });
                if (profileError) throw new Error(profileError.message)
            }
        }
    }

}
