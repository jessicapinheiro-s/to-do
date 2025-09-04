"use server";
import { createClient } from "@/utils/supabase/server";

interface propsAuth {
    type: string;
    email: string;
    password: string;
}

export async function createUserInProfiles(id: string) {
    const supabase = await createClient();
    try {
        const { error: profileError } = await supabase.from('profiles').insert({
            id,
            full_name: '',
            username_website: '',
            avatar_url: ''
        });
        if (profileError) throw new Error(profileError.message)
    } catch (error) {
        console.error(error)
    }
}

export async function login(props: { email: string, password: string }) {
    const supabase = await createClient();
    const {
        email,
        password
    } = props;
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        return error ? {
            user: null,
            erro: error
        } : {
            user: data
        }

    } catch (erro) {
        console.error(erro);
    }
}

export async function register(props: { email: string, password: string }) {
    const supabase = await createClient();
    const {
        email,
        password
    } = props;
    try {
        const userExists = await login({
            email,
            password
        });

        console.log('userExists', userExists);
        if (userExists?.erro && !userExists?.user === null) {
            return {
                user: null,
                erro: {
                    message: 'User already exists'
                }
            }

        } else {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) {
                return {
                    user: null,
                    erro: error
                }
            } else {
                return {
                    user: data
                }
            }
        }


    } catch (erro) {
        console.error(erro);
    }
}

export const authUser = async (props: propsAuth) => {
    const { type, email, password } = props;
    let result = undefined;

    if (type === 'login') {
        result = await login({
            email: email, password: password
        });
    } else {
        result = await register({
            email: email, password: password
        });
    }


    if (result && result.user && !result.erro) {

        const id = result?.user?.user?.id;

        if (id && type !== 'login') {
            await createUserInProfiles(id)
        }
    }
    return result;
}

