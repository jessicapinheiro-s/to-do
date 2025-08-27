// components/TaskForm.tsx
'use client';
import { useState } from 'react';
import { Task } from '../../../stores/tasks';
import ModalNotificacao from '../modal/modal-notificacao';
import { supabase } from '@/utils/supabase/client';

export default function FormCadastroTarefas() {
    const [nome, setNome] = useState('');
    const [urgencia, setUrgencia] = useState('');
    const [grupo, setGrupo] = useState('');
    const [data, setData] = useState('');
    const [repeat, setIfRepeat] = useState<boolean | undefined>();
    const [openModalNotification, setOpenModalNotification] = useState<boolean>(false);

    const createTasks = async (tasks: Task[]) => {
        const {
            data: { user },
        } = await (await supabase).auth.getUser();

        if (user?.id) {
            await Promise.all(
                tasks.map(async item => {
                    const { error, data } = await supabase.from('tasks').insert({
                        task_name: item.taskName,
                        task_group: item.taskClassification,
                        urgency_classification: item.taskUrgency,
                        task_repeat: item.task_repeat,
                        task_date: item.taskDate,
                        user_id: user?.id,
                    });
                })
            );
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome && !urgencia && !grupo && !data) return;

        const dateInQuestion = new Date(data);
        dateInQuestion.setDate(dateInQuestion.getDate() + 1);

        const taskArrToParam = [];
        const objToCreate: Task = {
            taskName: nome,
            taskStatus: 'Ativo',
            taskDate: new Date(dateInQuestion).toISOString().split("T")[0],
            taskUrgency: urgencia,
            taskClassification: grupo,
            task_repeat: repeat
        }

        if (grupo === 'Weekly') {
            const dateParaCalcular = new Date(dateInQuestion);
            const ultimoDia = new Date(dateParaCalcular.getFullYear() + 1, 0, 0).getTime();

            const diferencaHojeUltimoDia = Math.ceil((ultimoDia - dateInQuestion.getTime()) / (1000 * 60 * 60 * 24));
            const semanasDisponiveis = Math.floor(diferencaHojeUltimoDia / 7);


            if (repeat) {
                for (let i = 0; i < semanasDisponiveis; i++) {
                    if (i !== 0) {
                        dateInQuestion.setDate(dateInQuestion.getDate() + 7);
                    }
                    const dataAtualizada: Task = { ...objToCreate, taskDate: new Date(dateInQuestion).toISOString().split("T")[0] };
                    taskArrToParam.push(dataAtualizada);
                }
            } else {
                taskArrToParam.push(objToCreate);
            }

        } else if (grupo === 'Monthly') {
            const mesAtual = dateInQuestion.getMonth();
            const mesesFaltantes = 12 - mesAtual;


            if (repeat) {
                for (let i = 0; i < mesesFaltantes; i++) {
                    if (i !== 0) {
                        dateInQuestion.setMonth(dateInQuestion.getMonth() + 1);
                    }

                    const dataAtualizada: Task = { ...objToCreate, taskDate: new Date(dateInQuestion).toISOString().split("T")[0] };
                    taskArrToParam.push(dataAtualizada);
                }
            } else {
                taskArrToParam.push(objToCreate);
            }
        } else {
            taskArrToParam.push(objToCreate);
        }

        await createTasks(taskArrToParam);

        setNome('');
        setUrgencia('');
        setGrupo('');
        setData('');
        setIfRepeat(undefined);
        setOpenModalNotification(!openModalNotification)
    };

    return (
        <div className="flex-1 h-full flex flex-col items-center justify-center bg-white">
            <form
                className="bg-white p-8 rounded-xl md:shadow-md w-full max-w-md flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
                    Create Task
                </h1>
                <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    type="text"
                    required
                    className="border border-[#e0e0e0] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder='Task name'
                />
                <select
                    value={repeat == undefined ? 'Repeat' : repeat ? 'Yes' : 'No'}
                    onChange={(e) => setIfRepeat(e.target.value === 'Yes')}
                    className="border border-[#e0e0e0] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                >
                    <option value="">Repeat</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <select
                    value={urgencia}
                    onChange={(e) => setUrgencia(e.target.value)}
                    className="border border-[#e0e0e0] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                >
                    <option value="">Urgency classification</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <select
                    value={grupo}
                    onChange={(e) => setGrupo(e.target.value)}
                    className="border border-[#e0e0e0] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                >
                    <option value="">Task group</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>

                <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="border border-[#e0e0e0] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    min={new Date().toISOString().split('T')[0]}
                />

                <button
                    type="button"
                    className=" text-white p-2 rounded bg-blue-600 hover:bg-blue-700 transition"
                    onClick={(e) => { e.preventDefault(); handleSubmit(e); }}
                >
                    Create Task
                </button>

            </form>
            <ModalNotificacao title={'Task created sucessfully'} text={''} open={openModalNotification} onClose={() => setOpenModalNotification(false)} />
        </div>
    );
}
