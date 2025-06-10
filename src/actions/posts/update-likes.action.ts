import { actions, defineAction } from "astro:actions";
import { db, Posts, eq } from "astro:db";
import { z } from "astro:schema";

export const updatePostLikesAction = defineAction({
	accept: "json",
	input: z.object({
		postId: z.string(),
		increment: z.number(),
	}),
	handler: async ({ postId, increment }) => {
		/*
		try {
		    aquí lanzaba un error al solicitar otra server action desde esta server action, este es el error:
			title: 'Action unexpected called from the server.',
			hint: 'See the `Astro.callAction()` reference for usage examples: https://docs.astro.build/en/reference/api-reference/#callaction',
			frame: undefined,
			type: 'AstroError'
			al profe le funcionaba, a mi no, F
			const { data, error } = await actions.getPostLikesAction(postId); // se obtiene el número de likes del post con el otro action

			if (error) {
				console.error("Error en getPostLikesAction", error);
				throw new Error(
					"desde updatePostLikesAction: algo salió mal en la acción getPostLikesAction"
				);
			}

			const { likes, exists } = data;

			if (!exists) {
				const newPost = {
					id: postId,
					likes: increment,
					title: "Post not found",
				};

				await db.insert(Posts).values(newPost); // se crea el registro de ese post con 0 likes en la base de datos
			}

			const newLikes = likes + increment;

			await db
				.update(Posts)
				.set({ likes: newLikes })
				.where(eq(Posts.id, postId)); // ya existe el post en la base de datos, y se actualiza el número de likes

			return { success: true };
		} catch (error) {
			console.error("Error en updatePostLikesAction a continuación: ", error);
			throw new Error("desde updatePostLikesAction: algo salió mal");
		}
		*/

		const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

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
		post.likes = post.likes + increment;

		await db.update(Posts).set(post).where(eq(Posts.id, postId));

		return { success: true };
	},
});
