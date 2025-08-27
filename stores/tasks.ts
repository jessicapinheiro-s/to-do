import { create } from 'zustand';


export type Task = {
    taskName: string;
    taskDate: string;
    taskStatus: string;
    taskId?: number;
    taskUrgency: string;
    taskClassification: string;
    task_repeat?: boolean
}

export type TaskStore = {
    tasks: Task[];
    addTasks: (tasks: Task[]) => void;
    removeTask: (tasks: Task) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    addTasks: (tasks: Task[]) => set({ tasks }),
    removeTask: (tasks) => set((state) => ({ tasks: state.tasks.filter(task => task.taskName !== tasks.taskName)}))
}));