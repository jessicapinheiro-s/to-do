'use client';
import Header from "@/components/header/header";
import { Task, useTaskStore } from "../../../stores/tasks";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import ContainerTask from "@/components/container-task/container-task";

export default function CadastrarTarefa() {
    const { tasks, removeTask } = useTaskStore();
    const [filterTask, setFilterTask] = useState<string>('All');
    const [optionsTOshow, setOptionsTOshow] = useState();

    const mapingTasksInfo: Task[] = tasks.map(task => {
        return {
            ...task,
            taskDate: new Date(task.taskDate).toLocaleDateString()
        }
    });

    useEffect(() => {
        if (filterTask === 'All') {
            setOptionsTOshow(mapingTasksInfo);
        } else if (filterTask === 'Completed') {
            setOptionsTOshow(mapingTasksInfo);
        } else {
            setOptionsTOshow(mapingTasksInfo.filter(item => new Date(item.taskDate).getTime() < new Date().getTime()));
        }
    }, [filterTask]);

    const tasksByCategory = [
        {
            arr: mapingTasksInfo.filter(task => task.taskClassification === 'Daily'),
            title: 'Daily'
        },
        {
            arr: mapingTasksInfo.filter(task => task.taskClassification === 'Weekly'),
            title: 'Weekly'
        },
        {
            arr: mapingTasksInfo.filter(task => task.taskClassification === 'Monthly'),
            title: 'Monthly'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full flex flex-col items-center justify-start p-10 md:p-30 gap-10">
                <section className="w-full flex flex-row items-center justify-end">
                    <select
                        value={filterTask}
                        onChange={(e) => setFilterTask(e.target.value)}
                        className="border border-[#4A4A4A] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Delayed">Delayed</option>
                    </select>
                </section>
                <section className="w-full flex flex-row gap-10 flex-wrap">
                    {
                        optionsTOshow.map(item => (
                            <ContainerTask arrInfoTask={item.arr} title={item.title} />
                        ))
                    }
                </section>
            </main>
        </div>
    )
}