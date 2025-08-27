
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createTodo } from '@/lib/actions';
import { useEffect, useRef } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
    >
      {pending ? 'Agregando...' : 'Agregar'}
    </button>
  );
}

export function AddTodoForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTodo, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (state.message?.includes('exitosa')) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={dispatch} className="flex gap-2">
      <div className="flex-grow">
        <input
          id="text"
          name="text"
          type="text"
          placeholder="¿Qué necesitas hacer?"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
          aria-describedby="text-error"
        />
        <div id="text-error" aria-live="polite" aria-atomic="true">
          {state.errors?.text &&
            state.errors.text.map((error: string) => (
              <p className="mt-1 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}
