import React, { useState } from "react";
import Button from "../atoms/Button";
import { SquarePen, Trash2 } from "lucide-react";
import type { Task } from "../stores/slices/taskSlice";
import { useStore } from "../stores/store";

interface Props {
  tasks: Task[];
}

const TaskList: React.FC<Props> = ({tasks}) => {
    const toggleTask = useStore((state) => state.toggleTask);
    const deleteTask = useStore((state) => state.deleteTask);
    const editTask = useStore((state) => state.editTask);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPriority, setEditedPriority] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditedTitle(task.title);
    setEditedPriority(task.meta.priority);
    setEditedDueDate(task.meta.dueDate);
  };

  const handleEditSubmit = (taskId: string) => {
    if (editedTitle.trim() && editedPriority.trim() && editedDueDate.trim()) {
      editTask(
        {
          title: editedTitle,
          meta: { priority: editedPriority, dueDate: editedDueDate },
        },
        taskId
      );
      setEditingId(null);
    }
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => {
        const isEditing = editingId === task.id;

        return (
          <li
            key={task.id}
            className="flex flex-col bg-gray-100 dark:bg-gray-800 dark:text-white p-4 rounded dark:border-2"
          >
            <div className="flex items-center justify-between">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditSubmit(task.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  className="flex-1 p-1 mr-2 text-black dark:text-white rounded focus:outline-none"
                  autoFocus
                />
              ) : (
                <div
                  className={`flex-1 cursor-pointer ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.title}
                </div>
              )}

              {isEditing ? (
                <Button
                  variant="primary"
                  onClick={() => handleEditSubmit(task.id)}
                  className="mr-2"
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => startEditing(task)}
                  className="mr-2"
                >
                  <SquarePen />
                </Button>
              )}

              <Button variant="danger" onClick={() => deleteTask(task.id)}>
                <Trash2 />
              </Button>
            </div>

            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isEditing ? (
                <>
                  <select
                    value={editedPriority}
                    onChange={(e) => setEditedPriority(e.target.value)}
                    className="w-full p-1 mb-2 text-black dark:text-white rounded focus:outline-none"
                  >
                    <option value="">Select Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <input
                    type="date"
                    value={editedDueDate}
                    onChange={(e) => setEditedDueDate(e.target.value)}
                    className="w-full p-1 text-black dark:text-white rounded focus:outline-none"
                  />
                </>
              ) : (
                <>
                  <p>Priority: {task.meta.priority}</p>
                  <p>Due Date: {task.meta.dueDate}</p>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
