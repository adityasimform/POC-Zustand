import { useState } from "react";
import TaskInputForm from "../organisms/TaskInputForm";
import FilterControls from "../molecules/FilterControls";
import TaskList from "../organisms/TaskList";
import { useStore } from "../stores/store";

export const Dashboard = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    filter,
    setFilter,
    editTask,
  } = useStore();

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "done") return task.completed;
    return true;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !priority.trim() || !dueDate.trim()) return;
    addTask({ title: taskTitle, meta: { priority, dueDate } });
    setTaskTitle("");
    setPriority("");
    setDueDate("");
  };

  return (
    <main className="max-w-4xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 transition-all ">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          📝 Task
          <span className="py-1 text-blue-700 dark:text-blue-200 rounded-full">
            Dashboard
          </span>
        </h1>

        <TaskInputForm
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          priority={priority}
          setPriority={setPriority}
          dueDate={dueDate}
          setDueDate={setDueDate}
          handleAddTask={handleAddTask}
        />

        <FilterControls filter={filter} setFilter={setFilter} />

        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
    </main>
  );
};
