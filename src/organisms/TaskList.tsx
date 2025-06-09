import React, { useState } from 'react';
import Button from '../atoms/Button';
import type { Task } from '../stores/taskStore';
import { SquarePen, Trash2 } from 'lucide-react';

interface Props {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, toggleTask, deleteTask, editTask }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');

  const startEditing = (taskId: string, currentTitle: string) => {
    setEditingId(taskId);
    setEditedTitle(currentTitle);
  };

  const handleEditSubmit = (taskId: string) => {
    if (editedTitle.trim()) {
      editTask(taskId, editedTitle);
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
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 dark:text-white p-2 rounded dark:border-2"
          >
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEditSubmit(task.id);
                  if (e.key === 'Escape') setEditingId(null);
                }}
                className="flex-1 p-1 mr-2 text-black dark:text-white rounded focus:outline-none "
                autoFocus
              />
            ) : (
              <div
                className={`flex-1 cursor-pointer ${
                  task.completed ? 'line-through text-gray-400' : ''
                }`}
                onClick={() => toggleTask(task.id)}
              >
                {task.title}
              </div>
            )}

            {isEditing ? (
              <Button variant="primary" onClick={() => handleEditSubmit(task.id)} className="mr-2">
                Save
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => startEditing(task.id, task.title)}
                className="mr-2"
              >
                <SquarePen />
              </Button>
            )}

            <Button variant="danger" onClick={() => deleteTask(task.id)}>
              <Trash2 />
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
