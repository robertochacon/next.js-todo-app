
import { AddTodoForm } from '@/components/AddTodoForm';
import { TodoList } from '@/components/TodoList';
import type { Todo } from '@/lib/definitions';
import { sql } from '@vercel/postgres';

async function getTodos() {
  try {
    const { rows } = await sql<Todo>`SELECT * FROM todos ORDER BY created_at ASC`;
    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch todos.');
  }
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-24">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <header className="border-b border-slate-200 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-center text-slate-700">
              Mi Lista de Tareas
            </h1>
            <p className="text-center text-slate-500 mt-1">
              Creado con Next.js y Vercel Postgres
            </p>
          </header>
          
          <AddTodoForm />

          <div className="mt-8">
            <TodoList todos={todos} />
          </div>
        </div>
        <footer className="text-center mt-6 text-sm text-slate-500">
          <p>Gestiona tus tareas diarias de forma sencilla.</p>
        </footer>
      </div>
    </main>
  );
}
