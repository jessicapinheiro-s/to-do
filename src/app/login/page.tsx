// pages/auth.tsx
"use client";

import { authUser } from "@/app/login/actions";
import LoadingModal from "@/components/modal/loanding-modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ErrorMessages from "@/components/error-messages/error-messages";


export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [authProcessInit, setAuthProcessInit] = useState<boolean>(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState<string>("");
    const [errorAuth, seterrorAuth] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 6) return;
        setAuthProcessInit(true);
        
        const type = isLogin ? "login" : "cadastro";

        try {
            const result = await authUser({ type: type, email: email, password: password });


            if (result) {
                if (result.erro?.status && result.erro?.status  >= 400) {
                    seterrorAuth(true)
                }else if(result.user){
                    //inserir userId na store
                    router.replace("/minha-conta");
                }
            } 
        } catch (error) {
            console.error(error);
        } finally {
            setAuthProcessInit(false);
        }
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <section className="w-full flex flex-col items-center justify-center gap-6">
            <div className="w-full max-w-md md:p-8 bg-white rounded-lg md:shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? "Welcome back!" : "Welcome!"}
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={handleEmail}
                        className="border p-2 rounded-lg border-blue-600 outline-none"
                        required
                        autoComplete="email"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePassword}
                        className="border p-2 rounded-lg border-blue-600 outline-none"
                        required
                        minLength={6}
                        autoComplete={isLogin  ? "current-password" : "new-password"}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 hover:bg-blue-700 transition rounded-lg"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 hover:underline"
                        disabled={authProcessInit}
                    >
                        {authProcessInit ? "Processando.." : isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </div>
            {
                errorAuth && (
                    <ErrorMessages message="Incorrect credentials" />
                )
            }
            <LoadingModal open={authProcessInit} />
        </section>
    );
}
