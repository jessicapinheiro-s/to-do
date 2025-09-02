import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Task, useTaskStore } from "../../../stores/tasks";
import { supabase } from "@/utils/supabase/client";
import { mapInfoBaseToApp } from "@/utils/supabase/helpers";
import { getAndUpdateStore } from "@/utils/task/helpers";
import { useCallback } from "react";

interface propsContainer {
    arrInfoTask: Task[];
    title: string;
}

export default function ContainerTask(props: propsContainer) {
    const { arrInfoTask, title } = props;

    const deleteTask = useCallback(async (taskId: number | undefined) => {
        if (taskId) {
            try {
                const { error } = await supabase.from('tasks').delete().eq('id', taskId);
            } catch (error) {
                throw new Error('Erro ao deletar task');
            } finally {
                await getAndUpdateStore();
            }
        }
    }, []);

    const updateTask = useCallback(async (taskId: number | undefined, taskStatus: string) => {
        if (taskId && taskStatus) {
            try {
                const { error } = await supabase.from('tasks').update({
                    task_status: taskStatus === 'Ativo' ? 'Inativo' : 'Ativo'
                }).eq('id', taskId);
            } catch (error) {
                throw new Error('Erro ao deletar task');
            } finally {
                await getAndUpdateStore();
            }
        }
    }, []);

    const urgencyColor = (urgency: string) => ({
        High: "#E53E3E",
        Medium: "#D69E2E",
        Low: "#38A169"
    }[urgency] || "#000");

    const taskStatusColor = (status: string) => ({
        Ativo: "#4A4A4A",
        Inativo: "#155dfc"
    }[status] || "#000")

    return (
        <section className="w-full flex flex-col justify-start items-center rounded-lg gap-4  border border-[#e0e0e0] rounded-tl-lg rounded-tr-lg" >
            <div className="w-full text-center border-b-1 border-[#e0e0e0] rounded-tl-lg rounded-tr-lg bg-[#e7e7e7] py-1">
                <h1 className="font-semibold text-2xl text-[#4A4A4A]">{title}</h1>
            </div>
            <section className="w-full flex  gap-5  flex-row flex-wrap items-center justify-start md:py-10 md:px-16 py-5 px-8" style={{
            }}>
                {arrInfoTask.map((task) => (
                    <div key={task.taskId} className="w-2xs h-30 rounded-lg flex flex-row bg-white items-center justify-between border border-[#e0e0e0]">
                        <span
                            className="rounded-tl-lg rounded-bl-lg h-full w-2.5"
                            style={{ backgroundColor: urgencyColor(task.taskUrgency) }}
                        />
                        <div className="w-full flex h-full items-center flex-row px-5 py-0 break-words">
                            <div className="w-4/5">
                                <h2 className="font-semibold text-[16px]">{task.taskName}</h2>
                                <p>{task.taskDate}</p>
                            </div>
                            <div className="w-1/5 flex flex-col items-center justify-between">
                                <div>
                                    <IoCheckmarkDoneCircleOutline 
                                        className="text-[20px]" 
                                        style={{color: taskStatusColor(task.taskStatus)}} 
                                        onClick={(e) => updateTask(task.taskId, task.taskStatus)} 
                                    />
                                </div>
                                <div>
                                    <MdDelete 
                                        className="text-[#4A4A4A] text-[20px]" 
                                        onClick={(e) => 
                                        deleteTask(task.taskId)} 
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </section>
        </section>
    )
} 