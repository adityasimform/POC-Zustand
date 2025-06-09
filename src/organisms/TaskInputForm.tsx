import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface Props {
  taskTitle: string;
  setTaskTitle: (title: string) => void;
  handleAddTask: (e: React.FormEvent) => void;
}

const TaskInputForm: React.FC<Props> = ({ taskTitle, setTaskTitle, handleAddTask }) => (
  <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
    <Input
      placeholder="Enter new task"
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
    />
    <Button type="submit" disabled={taskTitle?.length == 0}>Add</Button>
  </form>
);

export default TaskInputForm;