import TaskInputForm from "../organisms/TaskInputForm";
import FilterControls from "../molecules/FilterControls";
import TaskList from "../organisms/TaskList";
import { useStore } from "../stores/store";

export const Tasks = () => {
    const tasks = useStore((state) => state.tasks);
    const filter = useStore((state) => state.filter);
    const setFilter = useStore((state) => state.setFilter);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "done") return task.completed;
    return true;
  });

  return (
    <main className="max-w-4xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 transition-all ">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          📝 Task
          <span className="py-1 text-blue-700 dark:text-blue-200 rounded-full">
            Dashboard
          </span>
        </h1>

        <TaskInputForm />

        <FilterControls filter={filter} setFilter={setFilter} />

        <TaskList tasks={filteredTasks} />
      </div>
    </main>
  );
};
