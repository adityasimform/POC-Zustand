import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useStore } from "../stores/store";

const TaskInputForm: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const addTask = useStore((state) => state.addTask);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !priority.trim() || !dueDate.trim()) return;
    addTask({ title: taskTitle, meta: { priority, dueDate } });
    setTaskTitle("");
    setPriority("");
    setDueDate("");
  };

  return (
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
};

export default TaskInputForm;
