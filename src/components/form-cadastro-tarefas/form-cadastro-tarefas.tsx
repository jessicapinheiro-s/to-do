// components/TaskForm.tsx
'use client';
import { useState } from 'react';

export default function FormCadastroTarefas() {
    const [nome, setNome] = useState('');
    const [urgencia, setUrgencia] = useState('');
    const [grupo, setGrupo] = useState('');
    const [data, setData] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome || !urgencia || !grupo || !data) {
            alert('Preencha todos os campos!');
            return;
        }
        alert(`Tarefa criada:\nNome: ${nome}\nUrgência: ${urgencia}\nGrupo: ${grupo}\nData: ${data}`);
        setNome('');
        setUrgencia('');
        setGrupo('');
        setData('');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-purple-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold mb-4 text-center text-purple-700">
                    Criar Tarefa
                </h1>
                <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    type="text"
                    required
                    className="border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder='Nome da tarefa'
                />

                <select
                    value={urgencia}
                    onChange={(e) => setUrgencia(e.target.value)}
                    className="border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                    <option value="">Classificação de urgência</option>
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                </select>

                <select
                    value={grupo}
                    onChange={(e) => setGrupo(e.target.value)}
                    className="border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                    <option value="">Grupo de tarefas</option>
                    <option value="Diária">Diária</option>
                    <option value="Semanal">Semanal</option>
                    <option value="Mensal">Mensal</option>
                </select>

                <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <button
                    type="submit"
                    className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition"
                >
                    Criar Tarefa
                </button>
            </form>
        </div>
    );
}
