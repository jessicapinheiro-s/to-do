// pages/auth.tsx
'use client';

import { authUser } from '@/app/login/actions';
import LoadingModal from '@/components/modal/loanding-modal';
import { useState } from 'react';
//import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [authProcessInit, setAuthProcessInit] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorAuth, seterrorAuth] = useState<boolean>(false);

    const userDataAuthProcess = async () => {
        const result = await authUser({ type: isLogin ? 'login' : 'cadastro', email: email, password: password });

        if (result?.code) {
            if (result?.code > 300) {
                seterrorAuth(true)
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        setAuthProcessInit(true);
        e.preventDefault();
        try {
            await userDataAuthProcess();
            setEmail('');
            setPassword('');
            redirect('/minha-conta');

            //revalidatePath('/', 'layout');
        } catch (error) {
            throw new Error('Erro ao autenticar o usuário');
        } finally {
            setAuthProcessInit(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md md:p-8 bg-white rounded-lg md:shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? 'Welcome back!' : 'Welcome!'}
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded-lg border-blue-600 outline-none"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded-lg border-blue-600 outline-none"
                        required
                        min={6}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 hover:bg-blue-700 transition rounded-lg"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 hover:underline"
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>

                {
                    errorAuth && (
                        <p className="mt-4 text-center text-sm text-gray-600">
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-blue-600 hover:underline"
                            >
                                {isLogin ? 'Register' : 'Login'}
                            </button>
                        </p>
                    )
                }
                <LoadingModal open={authProcessInit} />

            </div>
        </div>
    );
}
