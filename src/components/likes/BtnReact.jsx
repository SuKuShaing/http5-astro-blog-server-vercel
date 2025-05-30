import { useState, useEffect } from "react";

const BtnReact = ({ postId }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [likes, setLikes] = useState(0);

	// obtener likes
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
	}, [setLikes, setIsLoading, likes]);

	const darLike = () => {
		console.log("Like button clicked!");
	};

	return (
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
	);
};

export default BtnReact;
