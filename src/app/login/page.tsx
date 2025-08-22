// pages/auth.tsx
'use client';

import { authUser } from '@/app/login/actions';
import LoadingModal from '@/components/modal/loanding-modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [authProcessInit, setAuthProcessInit] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const userDataAuthProcess = async () => {
        await authUser({ type: isLogin ? 'login' : 'cadastro', email: email, password: password });
    }

    const changeRouter = (routerTo: string) => {
        router.replace(routerTo);
    };

    const handleSubmit = (e: React.FormEvent) => {
        setAuthProcessInit(true);
        e.preventDefault();
        userDataAuthProcess();

        setEmail('');
        setPassword('');
        setAuthProcessInit(false)
    };



    return (
        <div className="w-full flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? 'Login' : 'Cadastro'}
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded border-blue-600 outline-none"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded border-blue-600 outline-none"
                        required
                        min={6}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                    >
                        {isLogin ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 hover:underline"
                    >
                        {isLogin ? 'Cadastre-se' : 'Login'}
                    </button>
                </p>
                <LoadingModal open={authProcessInit} />

            </div>
        </div>
    );
}
