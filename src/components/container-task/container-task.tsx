import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Task } from "../../../stores/tasks";

interface propsContainer {
    arrInfoTask: Task[];
    title: string;
}

export default function ContainerTask(props: propsContainer) {
    const { arrInfoTask, title } = props;

    const deleteTask = (e: any) => {
        console.log('Task to be deleted', e);
    }
    const updateTask = (e: any) => {
        console.log('Task to be updated', e);
    }

    console.log('arrInfoTask', arrInfoTask);

    return (
        <section className="w-full flex flex-col justify-start items-center rounded-lg gap-4 border border-zinc-600" style={{
            width:
            arrInfoTask.length === 3 ?
            '25%' :
            arrInfoTask.length === 2 ?
            '45%' :
            '100%'
        }}>
            <h1 className="font-semibold text-2xl text-[#4A4A4A]">{title}</h1>
            <section className="md:w-10/12 w-full flex justify-center items-center gap-5 border border-amber-600" style={{
                flexDirection: arrInfoTask.length === 1 ? 'row' : 'column'
            }}>
                {arrInfoTask.map((task, index) => (
                    <div key={index} className="w-2xs h-20 rounded-lg flex flex-row bg-white items-center justify-between border border-[#e0e0e0]">
                        <span
                            className="rounded-tl-lg rounded-bl-lg h-full w-2.5"
                            style={{
                                backgroundColor:
                                task.taskUrgency === "High" ? 
                                "#E53E3E"
                                : task.taskUrgency === "Medium" ? 
                                "#D69E2E" : 
                                "#38A169"
                            }}
                        />
                        <div className="w-full flex flex-row px-5 py-3">
                            <div className="w-4/5">
                                <h2 className="font-semibold text-[16px]">{task.taskName}</h2>
                                <p>{task.taskDate}</p>
                            </div>
                            <div className="w-1/5 flex flex-col items-center justify-between">
                                <div>
                                    <IoCheckmarkDoneCircleOutline className="text-[20px]"  style={{
                                        color: 
                                        task.taskStatus === 'Ativo' ?
                                        '#4A4A4A' :
                                        '#155dfc'  
                                    }} onClick={(e) => updateTask(e)} />
                                </div>
                                <div>
                                    <MdDelete className="text-[#4A4A4A] text-[20px]" onClick={(e) => deleteTask(e)} />
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </section>
        </section>
    )
}