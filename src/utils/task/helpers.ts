import { Task, useTaskStore } from "../../../stores/tasks";
import { mapInfoBaseToApp } from "../supabase/helpers";

export async function getAndUpdateStore() {
    try {
        const data: Task[] | [] = await mapInfoBaseToApp();
        const tasksMaped = data.map(task => {
            return {
                ...task,
                taskDate: task.taskDate
            }
        });
        useTaskStore.getState().addTasks(tasksMaped);
    } catch (error) {
        throw new Error('Erro ao tentar obter tasks');
    }
}