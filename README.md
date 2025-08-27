
# Next.js Todo App con Vercel Postgres

Esta es una aplicación de lista de tareas construida con el App Router de Next.js, TypeScript, Tailwind CSS y Vercel Postgres.

## Guía de Configuración y Despliegue

Sigue estos pasos para configurar y desplegar tu propia instancia de esta aplicación en Vercel.

### 1. Clona y Despliega en Vercel

Haz clic en el botón "Deploy" para clonar este repositorio y desplegarlo en Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-postgres&project-name=nextjs-todo-postgres&repository-name=nextjs-todo-postgres&demo-title=Next.js%20Todo%20List%20with%20Vercel%20Postgres&demo-description=A%20simple%20Next.js%20app%20with%20Vercel%20Postgres.&demo-url=https%3A%2F%2Fpostgres-template.vercel.app%2F&demo-image=https%3A%2F%2Fpostgres-template.vercel.app%2Fopengraph-image.png&integration-ids=oac_V3R1GIpkoJorr6fqKADwv0I4)

Durante el proceso de despliegue, Vercel te pedirá que crees una nueva base de datos de **Vercel Postgres**.

### 2. Configura las Variables de Entorno

Una vez que la base de datos es creada, Vercel automáticamente agregará las variables de entorno necesarias (como `POSTGRES_URL`) a tu proyecto.

Si quieres correr el proyecto localmente, necesitas obtener estas variables.
1.  Ve al dashboard de tu proyecto en Vercel.
2.  Ve a la pestaña de **Settings** y luego a la sección de **Environment Variables**.
3.  Copia las variables y crea un archivo `.env` en la raíz de tu proyecto local. Pega las variables ahí.

Tu archivo `.env` debería lucir así:

```
POSTGRES_URL="postgres://..."
# ... (otras variables de Vercel Postgres)
```

### 3. Instala las Dependencias

En tu máquina local, abre una terminal y corre:

```bash
npm install
```

### 4. Crea la Tabla de la Base de Datos (Seed)

El siguiente paso es crear la tabla `todos` en tu base de datos. He incluido un script para hacer esto por ti.

Corre el siguiente comando en tu terminal:

```bash
npm run seed
```

Este comando ejecutará `scripts/seed.js`, que se conectará a tu Vercel Postgres y ejecutará la sentencia SQL `CREATE TABLE` para configurar el esquema necesario. También insertará un par de tareas de ejemplo.

### 5. Corre la Aplicación Localmente

¡Todo listo! Para iniciar el servidor de desarrollo, corre:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación funcionando.

