import type { APIRoute } from "astro";
import { db, eq, Posts } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
	const postId = params.id ?? "";
	// ?? se llama el operador de coalescencia nula, que devuelve el valor a la izquierda si no es null o undefined, de lo contrario devuelve el valor a la derecha.

	// verificamos sí existe en la base de datos
	const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

	if (posts.length === 0) {

        const post = {
            id: postId,
            title: "Post not found",
            likes: 0,
        }

		return new Response(JSON.stringify(post), {
			status: 200, // debería ser 404 pero por algo que el profe explicará más adelante se deja así, yo creo que como lo cita un botón de nuestra web, sí falla con un 404 algo crashea,en cambio con un 200 funciona y coloca 0 
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	return new Response(JSON.stringify(posts.at(0)), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
