"use client";

import { useState } from "react";
import Link from "next/link";
import { SiTask } from "react-icons/si";
import { FiMenu, FiX } from "react-icons/fi"; // ícones de menu e fechar

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenMenu = () => setIsOpen(true);

    const handleCloseMenu = () => setIsOpen(true);

    return (
        <header className="flex flex-row items-center justify-between border border-[#e0e0e0] px-6 md:px-20 py-5 relative">
            {/* Logo */}
            <div className="flex flex-row items-center gap-3">
                <SiTask className="text-blue-600 w-6 h-6" />
                <h1 className="font-bold text-2xl">TO DO</h1>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:block">
                <ul className="flex flex-row items-center gap-6">
                    <li>
                        <Link href="./minhas-tarefas" className="hover:text-blue-600 transition">
                            My Tasks
                        </Link>
                    </li>
                    <li>
                        <Link href="./cadastrar-tarefa" className="hover:text-blue-600 transition">
                            Create new Task
                        </Link>
                    </li>
                    <li>
                        <Link href="./minha-conta" className="hover:text-blue-600 transition">
                            Account
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Botão Mobile */}
            <button
                className="md:hidden text-2xl"
                onClick={handleOpenMenu}
                aria-label="Abrir menu"
            >
                <FiMenu />
            </button>

            {/* Drawer Lateral */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Cabeçalho do Drawer */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#e0e0e0]">
                    <div className="flex flex-row items-center gap-3">
                        <SiTask className="text-blue-600 w-6 h-6" />
                        <h1 className="font-bold text-2xl">TO DO</h1>
                    </div>
                    <button onClick={handleCloseMenu} aria-label="Fechar menu">
                        <FiX className="text-2xl" />
                    </button>
                </div>

                {/* Links */}
                <nav className="mt-6 px-6">
                    <ul className="flex flex-col gap-4">
                        <li>
                            <Link
                                href="./minhas-tarefas"
                                className="hover:text-blue-600 transition font-semibold "
                                onClick={handleCloseMenu}
                            >
                                My Tasks
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="./cadastrar-tarefa"
                                className="hover:text-blue-600 transition font-semibold "
                                onClick={handleCloseMenu}
                            >
                                Create new Task
                            </Link>
                        </li>
                        <li>
                            <Link href="./minha-conta" className="hover:text-blue-600 transition font-semibold ">
                                Account
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay escuro atrás do drawer */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={handleCloseMenu}
                ></div>
            )}
        </header>
    );
}
