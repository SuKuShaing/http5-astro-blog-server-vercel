import { getGreeting } from "./greetings/get-greetings.action";
import { getPostLikesAction } from "./posts/get-post-likes.action";

export const server = {
    getGreeting,
    getPostLikesAction,
};