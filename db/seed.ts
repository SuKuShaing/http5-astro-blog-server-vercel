import { getCollection } from "astro:content";
import { Clients, db, Posts } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Clients).values([
		{ id: 1, name: "Kasim", age: 25, isActive: true },
		{ id: 2, name: "Khalid", age: 30, isActive: false },
		{ id: 3, name: "Ali", age: 35, isActive: true },
		{ id: 4, name: "Fatima", age: 28, isActive: true },
		{ id: 5, name: "Aisha", age: 22, isActive: true },
		{ id: 6, name: "Zainab", age: 27, isActive: false },
		{ id: 7, name: "Omar", age: 32, isActive: true },
		{ id: 8, name: "Hassan", age: 29, isActive: false },
		{ id: 9, name: "Sara", age: 24, isActive: true },
		{ id: 10, name: "Layla", age: 31, isActive: false },
	]);

	const posts = await getCollection('blog');

	await db.insert(Posts).values(
		posts.map((post) => ({
			id : post.id,
			title: post.data.title,
			likes: Math.round( Math.random() * 100 ),
		})),
	);

	console.log("Seed Executed!!");
}