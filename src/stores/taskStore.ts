import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TaskFilter = "all" | "active" | "done";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
  setFilter: (filter: TaskFilter) => void;
}

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        filter: "all",
        addTask: (title) =>
          set((state) => ({
            tasks: [
              ...state.tasks,
              { id: crypto.randomUUID(), title, completed: false },
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
           editTask: (id, newTitle) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, title: newTitle } : task
          ),
        })),
        setFilter: (filter) => set(() => ({ filter })),
      }),
      {
        name: "task-store",
      }
    ),
    { name: "TaskStore" }
  )
);
