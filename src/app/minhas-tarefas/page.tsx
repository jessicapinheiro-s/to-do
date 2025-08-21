'use client';
import Header from "@/components/header/header";
import { Task, useTaskStore } from "../../../stores/tasks";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import ContainerTask from "@/components/container-task/container-task";

interface ObjParam {
    arr: Task[],
    title: string;
}
export default function CadastrarTarefa() {
    const { tasks, removeTask } = useTaskStore();
    const [filterTask, setFilterTask] = useState<string>('All');
    const [viewTask, setViewTask] = useState<string>('View');
    const [optionsTOshow, setOptionsTOshow] = useState<ObjParam[]>([]);

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
            ].filter(item => item.arr.length !== 0);
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
            ].filter(item => item.arr.length !== 0);
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
            ].filter(item => item.arr.length !== 0);

            setOptionsTOshow(tasksByCategory);
        }
    }, [filterTask]);

    useEffect(() => {
        let tasksByView: ObjParam[] = [];

        if (viewTask === 'View') {
            tasksByView = [
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
            ].filter(item => item.arr.length !== 0);
            setOptionsTOshow(tasksByView);
        } else if (viewTask === 'Daily') {
            tasksByView = [
                {
                    arr: mapingTasksInfo.filter(task => task.taskClassification === 'Daily'),
                    title: 'Daily'
                }
            ].filter(item => item.arr.length !== 0);
            setOptionsTOshow(tasksByView);
        } else if (viewTask === 'Monthly') {
            tasksByView = [
                {
                    arr: mapingTasksInfo.filter(task => task.taskClassification === 'Monthly'),
                    title: 'Monthly'
                }
            ].filter(item => item.arr.length !== 0);
            setOptionsTOshow(tasksByView);
        } else {
            tasksByView = [
                {
                    arr: mapingTasksInfo.filter(task => task.taskClassification === 'Weekly'),
                    title: 'Weekly'
                }
            ].filter(item => item.arr.length !== 0);
            setOptionsTOshow(tasksByView);
        }
    }, [viewTask]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full h-full flex flex-col items-center justify-start p-10 md:p-20 gap-y-4">
                <section className="w-full flex flex-row items-center justify-end">
                    <section className="w-full md:w-4/12 flex flex-row items-center justify-between gap-4 flex-wrap">
                        <section className="w-full flex flex-row items-start md:justify-between justify-end gap-2">
                            <span className=" flex flex-row items-center gap-2">
                                <span className="w-2 h-2 rounded-[50%] bg-[#E53E3E]"></span>
                                <span>High</span>
                            </span>
                            <span className=" flex flex-row items-center gap-2">
                                <span className="w-2 h-2 rounded-[50%] bg-[#D69E2E]"></span>
                                <span>Medium</span>
                            </span>
                            <span className=" flex flex-row items-center gap-2">
                                <span className="w-2 h-2 rounded-[50%] bg-[#38A169] "></span>
                                <span>Low</span>
                            </span>
                        </section>
                        <section className="w-full">
                            <select
                                value={viewTask}
                                onChange={(e) => setViewTask(e.target.value)}
                                className="w-full border border-[#e0e0e0] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="View">View</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </section>
                        <section className="w-full">
                            <select
                                value={filterTask}
                                onChange={(e) => setFilterTask(e.target.value)}
                                className="w-full border border-[#e0e0e0] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="All">All</option>
                                <option value="Completed">Completed</option>
                                <option value="Delayed">Delayed</option>
                            </select>
                        </section>
                    </section>
                </section>
                <section className="w-full flex-1 flex flex-row flex-wrap gap-10" style={{
                    alignItems: optionsTOshow?.length < 2 ? 'center' : 'flex-start',
                    justifyContent: optionsTOshow?.length < 2 ? 'space-between' : 'justify-start'
                }}>
                    {
                        optionsTOshow?.length !== 0 && (
                            optionsTOshow?.map((item, index) => (
                                <ContainerTask arrInfoTask={item.arr} title={item.title} key={index} />
                            ))
                        )
                    }
                    {
                        optionsTOshow?.length === 0 && (
                            <section className="w-full  flex flex-col items-center justify-center">
                                <span className="text-3xl">Você não tem nenhuma task cadastrada</span>
                            </section>
                        )
                    }
                </section>
            </main>
        </div>
    )
}