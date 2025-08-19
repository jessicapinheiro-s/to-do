'use client';
import Header from "@/components/header/header";
import { Task, useTaskStore } from "../../../stores/tasks";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import ContainerTask from "@/components/container-task/container-task";

interface ObjParam {
    arr: any[],
    title: string;
}
export default function CadastrarTarefa() {
    const { tasks, removeTask } = useTaskStore();
    const [filterTask, setFilterTask] = useState<string>('All');
    const [viewTask, setViewTask] = useState<string>('View');
    const [optionsTOshow, setOptionsTOshow] = useState<ObjParam[]>();

    const mapingTasksInfo: Task[] = tasks.map(task => {
        return {
            ...task,
            taskDate: new Date(task.taskDate).toLocaleDateString()
        }
    });

    useEffect(() => {
        let tasksByCategory: ObjParam[] = [];

        if (filterTask === 'All') {
            tasksByCategory = [
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
            setOptionsTOshow(tasksByCategory);
        } else if (filterTask === 'Completed') {
            tasksByCategory = [
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
            setOptionsTOshow(tasksByCategory);
        } else {
            const valueFiltered = mapingTasksInfo.filter(item => new Date(item.taskDate).getTime() < new Date().getTime());
            tasksByCategory = [
                {
                    arr: valueFiltered.filter(task => task.taskClassification === 'Daily'),
                    title: 'Daily'
                },
                {
                    arr: valueFiltered.filter(task => task.taskClassification === 'Weekly'),
                    title: 'Weekly'
                },
                {
                    arr: valueFiltered.filter(task => task.taskClassification === 'Monthly'),
                    title: 'Monthly'
                }
            ];
            setOptionsTOshow(tasksByCategory);
        }
    }, [filterTask]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full flex flex-col items-center justify-start p-10 md:p-20 gap-y-4">
                <section className="w-full flex flex-row items-center justify-end">
                    <section className="w-full md:w-4/12 flex flex-row items-center justify-between gap-2">
                        <section className="w-full flex flex-col items-start justify-start">
                            <span className=" flex flex-row items-center gap-0.5">
                                <span className="w-2 h-2 rounded-[50%] bg-[#E53E3E]"></span>
                                <span>High</span>
                            </span>
                            <span className=" flex flex-row items-center gap-0.5">
                                <span className="w-2 h-2 rounded-[50%] bg-[#D69E2E]"></span>
                                <span>Medium</span>
                            </span>
                            <span className=" flex flex-row items-center gap-0.5">
                                <span className="w-2 h-2 rounded-[50%] bg-[#38A169] "></span>
                                <span>Low</span>
                            </span>
                        </section>
                        <section className="w-full">
                            <select
                                value={viewTask}
                                onChange={(e) => setViewTask(e.target.value)}
                                className="w-full border border-[#4A4A4A] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="View">View</option>
                                <option value="Day">Day</option>
                                <option value="Week">Week</option>
                                <option value="Month">Month</option>
                            </select>
                        </section>
                        <section className="w-full">
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
                    </section>
                </section>
                <section className="w-full flex flex-row gap-10 flex-wrap">
                    {
                        optionsTOshow?.map((item, index) => (
                            <ContainerTask arrInfoTask={item.arr} title={item.title} key={index} />
                        ))
                    }
                </section>
            </main>
        </div>
    )
}