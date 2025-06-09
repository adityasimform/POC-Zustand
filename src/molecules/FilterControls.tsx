import React from 'react';
import Button from '../atoms/Button';
import type { TaskFilter } from '../stores/taskStore';

interface Props {
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
}

const FilterControls: React.FC<Props> = ({ filter, setFilter }) => (
  <div className="flex gap-4 mb-4">
    {(['all', 'active', 'done'] as TaskFilter[]).map((f) => (
      <Button
        key={f}
        onClick={() => setFilter(f)}
        variant={filter === f ? 'primary' : 'secondary'}
      >
        {f.charAt(0).toUpperCase() + f.slice(1)}
      </Button>
    ))}
  </div>
);

export default FilterControls;