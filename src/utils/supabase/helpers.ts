import { Task } from "../../../stores/tasks";
import { supabase } from "../supabase/client";


export async function getCurrentUser() {
    const { error, data } = await supabase.auth.getUser();

    if (!error) {
        return data;
    } else {
        console.log(error);
    }
}

export async function getTasksByUser() {
    const userId = await getCurrentUser();
    if (userId?.user.id) {
        const { data, error } = await supabase
            .from('tasks')
            .select('user_id, task_date, task_status, id, urgency_classification, task_group, task_repeat, task_name')
            .eq('user_id', userId?.user.id);

        if (error) {
            return [];
        }

        return data;
    } else {
        return [];
    }
}

export async function mapInfoBaseToApp() {
    const tasks = await getTasksByUser();

    if (tasks) {
        const tasksMaped: Task[] = tasks.map(task => {
            return {
                taskName: task.task_name,
                taskDate: task.task_date,
                taskStatus: task.task_status,
                taskId: task.id,
                taskUrgency: task.urgency_classification,
                taskClassification: task.task_group,
                task_repeat: task.task_repeat
            }
        });
        return tasksMaped;
    } else {
        return [];
    }
}
