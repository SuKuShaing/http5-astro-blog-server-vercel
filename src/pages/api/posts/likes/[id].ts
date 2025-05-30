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
		};

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

export const PUT: APIRoute = async ({ params, request }) => {

	const postId = params.id ?? "";

	const posts = await db.select().from(Posts).where(eq(Posts.id, postId));
	const { likes = 0 } = await request.json();

	if (posts.length === 0) {
		const newPost = {
			id: postId,
			title: "Post not found",
			likes: 0,
		};

		await db.insert(Posts).values(newPost); // insertamos el nuevo post con 0 likes a la base de datos
		posts.push(newPost); // agregamos el nuevo post al array de posts para que no falle el at(0) más adelante
	}

	const post = posts.at(0)!; // siempre tendremos un post 0, ya sea el que acabamos de crear o el que ya existía en la base de datos
	post.likes = post.likes + likes;

	await db.update(Posts).set(post).where(eq(Posts.id, postId));

	return new Response(JSON.stringify("ok!"), {status: 200,});
};
