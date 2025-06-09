import { useState } from 'react';
import { useTaskStore } from '../stores/taskStore';
import TaskInputForm from '../organisms/TaskInputForm';
import FilterControls from '../molecules/FilterControls';
import TaskList from '../organisms/TaskList';

export const Dashboard = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const { tasks, addTask, toggleTask, deleteTask, filter, setFilter , editTask} = useTaskStore();

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'done') return task.completed;
    return true;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask(taskTitle);
    setTaskTitle('');
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
