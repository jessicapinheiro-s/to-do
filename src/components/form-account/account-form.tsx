'use client';
import { supabase } from "@/utils/supabase/client"
import { type User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { FaRegSave, FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { useRouter } from 'next/navigation';

export default function FormAccount({ user }: { user: User | null }) {
    const [name, setName] = useState<string>(' ');
    const [userName, setUserName] = useState<string>(' ');
    const [userEmail, setUserEmail] = useState<string>(' ');
    const [onEdit, setOnEdit] = useState<boolean>(false);
    const router = useRouter();
    const getUserData = useCallback(async () => {
        try {
            const { data, error, status } = await (supabase).from('profiles').select('full_name, username_website, avatar_url').eq('id', user?.id).single();
            if (error && status !== 406) {
                throw new Error('Erro ao obter informações do usuário');
            } else {
                if (data) {
                    setName(data.full_name);
                    setUserName(data.username_website);
                }
                setUserEmail(user?.email ?? '');
            }
        } catch (error) {
            throw new Error('Erro ao obter informações do usuário');
        }
    }, []);

    async function updateUserPersonalInfo() {
        if (!name || !userName || !userEmail) return;

        const { data, error } = await supabase.from('profiles').update({
            full_name: name,
            username_website: userName
        }).eq('id', user?.id);

        if (error) {
            console.error("Erro ao atualizar:", error.message);
        }
    }

    useEffect(() => {
        getUserData();
    }, [user, getUserData])


    if (!user) return;

    const onEditUserPersonalInfo = () => {
        setOnEdit(true);
    }

    const saveInfo = () => {
        updateUserPersonalInfo();
    }

    const logout = async () => {
        const { error: errorLogout } = await supabase.auth.signOut();

        if(errorLogout) {
            console.error('Erro ao deslogar');
        }
        router.replace('/');
    }

    return (
        <div className="flex-1 w-full h-full flex flex-col items-center justify-start  gap-y-4">
            <div className="w-full text-center">
                <h1 className="text-3xl font-semibold text-blue-600">Account</h1>
            </div>
            <form
                className="w-full  flex flex-col gap-8">
                <div className="w-full flex flex-row items-center justify-between gap-4">
                    <div className="w-full flex flex-col items-start justify-start">
                        <div className="w-full md:w-1/6 flex flex-col items-center justify-center border rounded-lg py-4 border-[#e0e0e0]">
                            <FaRegUserCircle
                                className="text-6xl"
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-end justify-end gap-4">
                        <button className="px-4 py-2 md:px-8 md:py-3 text-white rounded bg-blue-600 hover:bg-blue-700 transition" onClick={onEditUserPersonalInfo} type="button">
                            <MdEdit className="text-[20px]" />
                        </button>
                        {
                            onEdit && (
                                <button className="px-4 py-2 md:px-8 md:py-3 text-white rounded bg-blue-600 hover:bg-blue-700 transition" onClick={saveInfo} type="button">
                                    <FaRegSave className="text-[20px]" />
                                </button>
                            )
                        }

                    </div>
                </div>
                <div className="w-full flex flex-row md:flex-col items-center justify-between gap-8 flex-wrap">
                    <div className="w-full flex flex-col items-start">
                        <label htmlFor="nameUser">Name</label>
                        {
                            onEdit && (
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border p-2 rounded border-[#e0e0e0] outline-none focus:outline-none focus:ring-2 focus:ring-blue-400 "
                                    id="nameUser"
                                    name="nameUser"
                                    required
                                />
                            )
                        }
                        {
                            !onEdit && (
                                <span className="w-full h-[42px] border p-2 rounded border-[#e0e0e0] outline-none">
                                    {name}
                                </span>
                            )
                        }

                    </div>
                    <div className="w-full flex flex-col items-start">
                        <label htmlFor="userName">Username</label>
                        {
                            onEdit && (
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full border p-2 rounded border-[#e0e0e0] outline-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    id="userName"
                                    name="userName"
                                    required
                                />
                            )
                        }
                        {
                            !onEdit && (
                                <span className="w-full h-[42px] border p-2 rounded border-[#e0e0e0] outline-none">
                                    {userName}
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className="w-full flex flex-col items-start">
                    <label htmlFor="userEmail">User e-mail</label>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full border p-2 rounded border-[#e0e0e0] outline-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        id="userEmail"
                        name="userEmail"
                        required
                        readOnly
                    />

                </div>
                <div className="w-full flex flex-col items-end">
                    <button className="px-4 py-2 md:px-8 md:py-3 text-white rounded bg-red-600 hover:bg-red-700 transition" onClick={logout} type="button">
                        <FiLogOut className="text-[20px]" />
                    </button>
                </div>
            </form>
        </div>
    )
}