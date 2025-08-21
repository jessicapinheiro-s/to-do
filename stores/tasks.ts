import { create } from 'zustand';

export type Task = {
    taskName: string;
    taskDate: string;
    taskStatus: string;
    taskId?: number;
    taskUrgency: string;
    taskClassification: string;
}

export type TaskStore = {
    tasks: Task[];
    addTask: (taskParam: Task) => void;
    removeTask: (taskParam: Task) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    addTask: (taskParam) => set((state) => ({ tasks: [...state.tasks, taskParam] })),
    removeTask: (taskParam) => set((state) => ({ tasks: state.tasks.filter(task => task.taskName !== taskParam.taskName)}))
}));