
import { Todo } from '@/lib/definitions';
import { TodoItem } from './TodoItem';
import { FaTasks } from 'react-icons/fa';

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-slate-50 rounded-lg">
        <FaTasks className="mx-auto text-4xl text-slate-400 mb-4" />
        <h3 className="text-lg font-semibold text-slate-600">¡Todo listo!</h3>
        <p className="text-slate-500">No tienes tareas pendientes. ¡Agrega una nueva para empezar!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
