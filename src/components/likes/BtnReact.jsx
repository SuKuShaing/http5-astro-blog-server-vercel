import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const BtnReact = ({ postId }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [likes, setLikes] = useState(0);
	const [clickDados, setClickDados] = useState(0);

	// obtener likes de la base de datos
	useEffect(() => {
		const fetchLikes = async () => {
			try {
				const response = await fetch(`/api/likes/${postId}`);
				const data = await response.json();
				setLikes(data.likes);
			} catch (error) {
				console.error("Error fetching likes:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchLikes();
	}, [postId]);

	const darLike = async () => {
		setLikes((prevLikes) => prevLikes + 1);
		setClickDados((prevClick) => prevClick + 1);

		// obtener posición actual del mouse
		const mouseX = window.event.clientX || 0;
		const mouseY = window.event.clientY || 0;

		confetti({
			particleCount : 150,
			startVelocity: 50,
			spread: 90,
			origin: {
				x: mouseX / window.innerWidth,
				y: mouseY / window.innerHeight,
			},
		});

		// Envía el nuevo like al backend
		try {
			await fetch(`/api/likes/${postId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ clickDados }),
			});
		} catch (error) {
			console.error("Error actualizando likes:", error);
		}

		// resetea el contador de clics después de 2 segundos
		setClickDados(0);
	};

	return (
		<>
			<button
				onClick={() => darLike()}
				style={{
					backgroundColor: "rgb(6, 9, 172)",
					color: "white",
					padding: "10px 20px",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
					transition: "all 0.3s",
					// background hover
					":hover": {
						backgroundColor: "rgb(4, 6, 120)",
						transform: "scale(1.05)",
					},
				}}
			>
				{isLoading ? "Loading..." : likes === 0 ? "Like me!" : `${likes} Likes`}
			</button>
			{`${clickDados}`}
		</>
	);
};

export default BtnReact;
