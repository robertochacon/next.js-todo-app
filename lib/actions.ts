
'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  text: z.string().min(1, { message: 'El texto no puede estar vacío.' }),
  completed: z.boolean(),
  created_at: z.string(),
});

const CreateTodo = FormSchema.omit({ id: true, completed: true, created_at: true });

export type State = {
  errors?: {
    text?: string[];
  };
  message?: string | null;
};

export async function createTodo(prevState: State, formData: FormData) {
  const validatedFields = CreateTodo.safeParse({
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos. No se pudo crear la tarea.',
    };
  }

  const { text } = validatedFields.data;
  
  try {
    await sql`INSERT INTO todos (text) VALUES (${text})`;
  } catch (error) {
    return {
      message: 'Error de base de datos: No se pudo crear la tarea.',
    };
  }

  revalidatePath('/');
  return { message: 'Tarea creada exitosamente.', errors: {} };
}

export async function toggleTodo(id: string, completed: boolean) {
    try {
        await sql`UPDATE todos SET completed = ${!completed} WHERE id = ${id}`;
        revalidatePath('/');
    } catch(error) {
        throw new Error('Error de base de datos: No se pudo actualizar la tarea.');
    }
}

export async function deleteTodo(id: string) {
    try {
        await sql`DELETE FROM todos WHERE id = ${id}`;
        revalidatePath('/');
    } catch(error) {
        throw new Error('Error de base de datos: No se pudo eliminar la tarea.');
    }
}
