'use client';

import { Todo } from '@/lib/definitions';
import { toggleTodo, deleteTodo } from '@/lib/actions';
import { useTransition } from 'react';
import { FaTrash, FaSpinner } from 'react-icons/fa';
import clsx from 'clsx';

// FIX: Define a named interface for component props. This helps TypeScript correctly
// infer that this is a React component, allowing standard props like `key` without error.
interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(() => {
      toggleTodo(todo.id, todo.completed);
    });
  };

  const handleDelete = () => {
    startTransition(() => {
        deleteTodo(todo.id);
    });
  };

  return (
    <li className="group flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={isPending}
          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:cursor-wait"
        />
        <span
          className={clsx(
            "text-slate-700 transition-colors duration-300",
            { 'line-through text-slate-400': todo.completed }
          )}
        >
          {todo.text}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {isPending && <FaSpinner className="animate-spin text-slate-400" />}
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:cursor-wait"
          aria-label="Eliminar tarea"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}
