'use client';
import Header from "@/components/header/header";
import { useTaskStore } from "../../../stores/tasks";

export default function CadastrarTarefa() {
    const { tasks, removeTask } = useTaskStore();

    const mapingTasksInfo = tasks.map(task => {
        return {
            ...task,
            taskDate: new Date(task.taskDate).toLocaleDateString()
        }
    })

    const tasksByCategory = {
        daily: mapingTasksInfo.filter(task => task.taskClassification === 'Daily'),
        weekly: mapingTasksInfo.filter(task => task.taskClassification === 'Weekly'),
        monthly: mapingTasksInfo.filter(task => task.taskClassification === 'Monthly')
    };

    console.log(tasksByCategory);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 w-full flex flex-col items-center justify-center p-30">
                <section className="w-full flex flex-row gap-10">
                    {/* Daily */}
                    <section className="md:w-4/12 flex flex-col justify-start items-center bg-[#DCEAFB] rounded-lg p-10 gap-4">
                        <h1 className="font-semibold text-2xl text-[#4A4A4A]">Daily</h1>
                        <section className="md:w-8/12 w-full flex flex-col justify-center items-center gap-5">
                            {tasksByCategory.daily.map((task) => (
                                <div className="w-full h-full rounded-lg flex flex-row bg-white" key={task.taskName}>
                                    <span
                                        className="rounded-tl-lg rounded-bl-lg h-full w-2.5"
                                        style={{
                                            backgroundColor:
                                                task.taskUrgency === "High"
                                                    ? "#E53E3E"
                                                    : task.taskUrgency === "Medium"
                                                        ? "#D69E2E"
                                                        : "#38A169",
                                        }}
                                    />
                                    <div className="px-5 py-3">
                                        <h2 className="font-semibold text-[16px]">{task.taskName}</h2>
                                        <p>{task.taskDate}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </section>

                    {/* Weekly */}
                    <section className="md:w-4/12 flex flex-col justify-start items-center bg-[#E8F8E8] rounded-lg p-10 gap-4">
                        <h1 className="font-semibold text-2xl text-[#4A4A4A]">Weekly</h1>
                        <section className="md:w-8/12 w-full flex flex-col justify-center items-center gap-5">
                            {tasksByCategory.weekly.map((task) => (
                                <div className="w-full h-full rounded-lg flex flex-row bg-white" key={task.taskName}>
                                    <span
                                        className="rounded-tl-lg rounded-bl-lg h-full w-2.5"
                                        style={{
                                            backgroundColor:
                                                task.taskUrgency === "High"
                                                    ? "#E53E3E"
                                                    : task.taskUrgency === "Medium"
                                                        ? "#D69E2E"
                                                        : "#38A169",
                                        }}
                                    />
                                    <div className="px-5 py-3">
                                        <h2 className="font-semibold text-[16px]">{task.taskName}</h2>
                                        <p>{task.taskDate}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </section>

                    {/* Monthly */}
                    <section className="md:w-4/12 flex flex-col justify-start items-center bg-[#FDEDF2] rounded-lg p-10 gap-4">
                        <h1 className="font-semibold text-2xl text-[#4A4A4A]">Monthly</h1>
                        <section className="md:w-8/12 w-full flex flex-col justify-center items-center gap-5">
                            {tasksByCategory.monthly.map((task) => (
                                <div className="w-full h-full rounded-lg flex flex-row bg-white" key={task.taskName}>
                                    <span
                                        className="rounded-tl-lg rounded-bl-lg h-full w-2.5"
                                        style={{
                                            backgroundColor:
                                                task.taskUrgency === "High"
                                                    ? "#E53E3E"
                                                    : task.taskUrgency === "Medium"
                                                        ? "#D69E2E"
                                                        : "#38A169",
                                        }}
                                    />
                                    <div className="px-5 py-3">
                                        <h2 className="font-semibold text-[16px]">{task.taskName}</h2>
                                        <p>{task.taskDate}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </section>
                </section>
            </main>
        </div>
    )
}