<template>
	<button disabled class="loading" v-if="isLoading">
		Loading...
	</button>

    <button v-else-if="likeCount===0" @click="likePost">
		Like this post
    </button>

    <button v-else @click="likePost">
		Likes
		<span>{{ likeCount }}</span>
    </button>

	{{ likeClicks }}
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'; // Importamos ref de Vue para manejar el estado reactivo
import confetti from 'canvas-confetti';

interface Props {
	postId: string;
}

const props = defineProps<Props>(); // aquí traemos las propiedades del componente
console.log(`Post ID: ${props.postId}`);

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch( likeCount, () => {

	fetch(`/api/posts/likes/${props.postId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ likes: likeClicks.value }),
	})
	likeClicks.value = 0; // Resetear el contador de clics después de enviar

})



const likePost = () => {
	likeCount.value++;
	likeClicks.value++;

	confetti({
		particleCount: 100,
		spread: 70,
		origin: { 
			x: Math.random(),
			y: Math.random() - 0.2
		},
	});
}



const getCurrentLikes = async () => {
	const resp = await fetch(`/api/posts/likes/${props.postId}`);
	if (!resp.ok) {
		console.error('Error fetching likes:', resp.statusText);
		return;
	}

	const data = await resp.json();
	console.log("🚀 ~ getCurrentLikes ~ data:", data)

	likeCount.value = data.likes;
	isLoading.value = false;
}

getCurrentLikes();
</script>

<style scoped>
button {
	background-color: #36a070;
	color: white;
	padding: 10px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.3s;
}

button:hover {
	background-color: #246e4d;
}
</style>
