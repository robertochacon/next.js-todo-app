
const { db } = require('@vercel/postgres');

async function seedTodos(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "todos" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS todos (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "todos" table`);

    // Insert data into the "todos" table
    const todos = await Promise.all([
      client.sql`
        INSERT INTO todos (text, completed)
        VALUES ('Configurar base de datos Vercel Postgres', true)
        ON CONFLICT (id) DO NOTHING;
      `,
      client.sql`
        INSERT INTO todos (text)
        VALUES ('Desplegar en Vercel')
        ON CONFLICT (id) DO NOTHING;
      `,
      client.sql`
        INSERT INTO todos (text)
        VALUES ('Dominar Next.js Server Actions')
        ON CONFLICT (id) DO NOTHING;
      `,
    ]);

    console.log(`Seeded ${todos.length} todos`);

    return {
      createTable,
      todos,
    };
  } catch (error) {
    console.error('Error seeding todos:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedTodos(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
