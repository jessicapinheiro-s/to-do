// components/TaskForm.tsx
'use client';
import { useState } from 'react';
import { useTaskStore, Task } from '../../../stores/tasks';
import { useRouter } from 'next/navigation';

export default function FormCadastroTarefas() {
    const [nome, setNome] = useState('');
    const [urgencia, setUrgencia] = useState('');
    const [grupo, setGrupo] = useState('');
    const [data, setData] = useState('');
    const { tasks, addTask, removeTask } = useTaskStore();
    const router = useRouter();

    const changeRouter = (routerTo: string) => {
        router.replace(routerTo);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataHoje = new Date();
        if (!nome && !urgencia && !grupo && !data) return;


        const objToCreate: Task = {
            taskName: nome,
            taskDate: data,
            taskUrgency: urgencia,
            taskClassification: grupo
        }

        if(grupo === 'Weekly') {
        
        }else if(grupo === 'Monthly'){

        }else{
            
        }

        addTask(objToCreate);

        setNome('');
        setUrgencia('');
        setGrupo('');
        setData('');

        //changeRouter('/minhas-tarefas');
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-white">
            <form
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
                    Criar Tarefa
                </h1>
                <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    type="text"
                    required
                    className="border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder='Nome da tarefa'
                />

                <select
                    value={urgencia}
                    onChange={(e) => setUrgencia(e.target.value)}
                    className="border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                >
                    <option value="">Classificação de urgência</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <select
                    value={grupo}
                    onChange={(e) => setGrupo(e.target.value)}
                    className="border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                >
                    <option value="">Grupo de tarefas</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>

                <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    min={new Date().toISOString().split('T')[0]}
                />

                <button
                    type="button"
                    className=" text-white p-2 rounded bg-blue-600 hover:bg-blue-700 transition"
                    onClick={(e) => { e.preventDefault(); handleSubmit(e);}}
                >
                    Criar Tarefa
                </button>
            </form>
        </div>
    );
}
