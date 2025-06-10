import type { StateCreator } from "zustand";

export type TaskFilter = "all" | "active" | "done";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  meta: {
    priority: string;
    dueDate: string;
  };
}

export interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  addTask: (task: {
    title: string;
    meta: { priority: string; dueDate: string };
  }) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (
    task: { title: string; meta: { priority: string; dueDate: string } },
    id: string
  ) => void;
  setFilter: (filter: TaskFilter) => void;
}

export const createTaskSlice: StateCreator<TaskState> = (set) => ({
  tasks: [],
  filter: "all",
  addTask: ({ title, meta }) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
          meta: {
            priority: meta?.priority || "",
            dueDate: meta?.dueDate || "",
          },
        },
      ],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  editTask: ({ title, meta }, id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, title: title, meta: { ...task.meta, ...meta } }
          : task
      ),
    })),
  setFilter: (filter) => set(() => ({ filter })),
});
