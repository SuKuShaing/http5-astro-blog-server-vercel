import { defineDb, defineTable, column } from 'astro:db';

// creamos una tabla de clientes
const Clients = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean(),
  }
})

// tabla de likes de los posts
const Posts = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    likes: column.number(),
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Clients,
    Posts,
  }
});
