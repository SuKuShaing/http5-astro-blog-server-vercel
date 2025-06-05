import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const getGreeting = defineAction({
    input: z.object({  // este input la definición es el que uno recibe en el handler
        name: z.string(),
        age: z.number(),
        isActive: z.boolean(),
    }),

    // handler: async (input) => { // aquí uno recibe el input de la definición
    handler: async ({ name, age, isActive }) => {
        console.log({name, age, isActive});

        return `Hello, ${name}! You are ${age} years old and ${isActive ? "active" : "inactive"}`;
    },
});