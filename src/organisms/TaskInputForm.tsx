import React from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface Props {
  taskTitle: string;
  setTaskTitle: (title: string) => void;
  priority: string;
  setPriority: (priority: string) => void;
  dueDate: string;
  setDueDate: (date: string) => void;
  handleAddTask: (e: React.FormEvent) => void;
}

const TaskInputForm: React.FC<Props> = ({
  taskTitle,
  setTaskTitle,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  handleAddTask,
}) => (
  <form onSubmit={handleAddTask} className="flex flex-col gap-4 mb-4">
    <Input
      placeholder="Enter new task"
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
    />
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="p-2 border rounded text-black"
    >
      <option value="">Select Priority</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
    <Input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
    />
    <Button
      type="submit"
      disabled={
        taskTitle?.length === 0 ||
        priority?.length === 0 ||
        dueDate?.length === 0
      }
    >
      Add
    </Button>
  </form>
);

export default TaskInputForm;
