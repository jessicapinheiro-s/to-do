'use client';
import Header from "@/components/header/header";
import { Task, useTaskStore } from "../../../stores/tasks";
import { useEffect, useMemo, useState } from "react";
import ContainerTask from "@/components/container-task/container-task";
import { mapInfoBaseToApp } from "@/utils/supabase/helpers";
import { getAndUpdateStore } from "@/utils/task/helpers";
import LoadingModal from "@/components/modal/loanding-modal";

interface ObjParam {
    arr: Task[],
    title: string;
}
export default function CadastrarTarefa() {
    const { tasks } = useTaskStore();
    const [filterTask, setFilterTask] = useState<string>('All');
    const [viewTask, setViewTask] = useState<string>('View');
    const [byNowTask, setByNowTask] = useState<string>('All');
    const [authProcessInit, setAuthProcessInit] = useState<boolean>(false);

    const createGroups = (arr: typeof tasks, types: string[]): ObjParam[] => {
        return types.map(type => ({
            arr: arr.filter(task => task.taskClassification === type),
            title: type
        })).filter(item => item.arr.length !== 0);
    };

    const getInitialData = async () => {
        try {
            setAuthProcessInit(true);
            await getAndUpdateStore();
        } catch (erro) {
            console.error('Erro ao mapear informações da base para o app, erro:', erro);
        } finally {
            setAuthProcessInit(false);
        }
    };

    const optionsTOshow: ObjParam[] = useMemo(() => {
        let tasksByCategory: ObjParam[] = [];
        let baseTasks = tasks;
        let filterByParameter: any[] = [];

        if (filterTask === "Completed") {
            baseTasks = baseTasks.filter(item => item.taskStatus === 'Inativo');
        }

        if (filterTask === "Delayed") {
            baseTasks = baseTasks.filter(item => !(new Date(item.taskDate).getTime() < new Date().getTime()) && item.taskStatus === 'Ativo');
        }


        if (byNowTask === 'Today') {
            filterByParameter = baseTasks.filter(item => item.taskDate === new Date().toISOString().split('T')[0])
            baseTasks = filterByParameter;

        } else if (byNowTask === 'This Week') {
            const today: Date = new Date();
            const dayOfWeek: number = new Date().getDay();
            const getLastDayThisWeek: Date = new Date(today.setDate(today.getDate() + (6 - dayOfWeek)));
            const getFirsttDayThisWeek: Date = new Date(new Date(getLastDayThisWeek).setDate(new Date(getLastDayThisWeek).getDate() - 6));

            filterByParameter = baseTasks.filter(item => new Date(item.taskDate).getTime() > getFirsttDayThisWeek.getTime() && new Date(item.taskDate).getTime() < getLastDayThisWeek.getTime())
            baseTasks = filterByParameter;

        } else if (byNowTask === 'This Month') {
            const today: Date = new Date();
            const todayDay: number = new Date().getDate();;
            const getLastDayThisWeek: Date = new Date(today.setDate(today.getDate() + 31));
            const getFirsttDayThisWeek: Date = new Date(new Date(getLastDayThisWeek).setDate(new Date(getLastDayThisWeek).getDate() - 6));


            filterByParameter = baseTasks.filter(item => new Date(item.taskDate).getTime() > getFirsttDayThisWeek.getTime() && new Date(item.taskDate).getTime() < getLastDayThisWeek.getTime())
            baseTasks = filterByParameter;

            console.log({
                last: getLastDayThisWeek,
                first: getFirsttDayThisWeek,
                today: today,
                dayOfWeek: dayOfWeek,
                dayOfWeekmenos: 7 - dayOfWeek,
                filterByParameter: filterByParameter
            })

        }

        tasksByCategory = createGroups(baseTasks, ["Daily", "Weekly", "Monthly"]);

        // Regras de viewTask
        if (viewTask === "View") {
            tasksByCategory = createGroups(baseTasks, ["Daily", "Weekly", "Monthly"]);
        } else {
            tasksByCategory = createGroups(baseTasks, [viewTask]);
        }

        return tasksByCategory;

    }, [filterTask, viewTask, tasks, byNowTask]);

    useEffect(() => {
        getInitialData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full flex flex-col items-center justify-start p-10 md:p-20 gap-y-4">
                <section className="w-full flex flex-row items-center justify-end">
                    <section className="w-full md:w-12/12 flex flex-row items-center justify-between md:justify-end gap-4 flex-wrap">
                        <section className="w-full md:w-2/12 flex flex-row items-start md:justify-between justify-end gap-2">
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
                        <section className="w-full md:w-2/12 ">
                            <select
                                value={byNowTask}
                                onChange={(e) => setByNowTask(e.target.value)}
                                className="w-full md: 4/12 border border-[#e0e0e0] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="All">All</option>
                                <option value="Today">Today</option>
                                <option value="This Week">This Week</option>
                                <option value="This Month">This Month</option>
                            </select>
                        </section>
                        <section className="w-full md:w-2/12 ">
                            <select
                                value={viewTask}
                                onChange={(e) => setViewTask(e.target.value)}
                                className="w-full md: 4/12 border border-[#e0e0e0] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="View">View</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </section>
                        <section className="w-full md:w-2/12 ">
                            <select
                                value={filterTask}
                                onChange={(e) => setFilterTask(e.target.value)}
                                className="w-full md: 4/12  border border-[#e0e0e0] rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            >
                                <option value="All">All</option>
                                <option value="Completed">Completed</option>
                                <option value="Delayed">Delayed</option>
                            </select>
                        </section>
                    </section>
                </section>
                <section className="w-full flex-1 flex flex-row flex-wrap gap-10 items-start justify-start" >
                    {
                        optionsTOshow?.length !== 0 && (
                            optionsTOshow?.map((item, index) => (
                                <ContainerTask arrInfoTask={item.arr} title={item.title} key={item.arr[0].taskId} />
                            ))
                        )
                    }
                    {
                        optionsTOshow?.length === 0 && (
                            <section className="w-full flex-1 flex self-stretch flex-col items-center justify-center">
                                <span className="text-3xl">You haven’t created any task yet.</span>
                            </section>
                        )
                    }
                </section>
                <LoadingModal open={authProcessInit} />
            </main>
        </div>
    )
}