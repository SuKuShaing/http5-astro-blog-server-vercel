import { getGreeting } from "./greetings/get-greetings.action";
import { getPostLikesAction } from "./posts/get-likes.action";
import { updatePostLikesAction } from "./posts/update-likes.action";

export const server = {
    getGreeting,
    getPostLikesAction,
    updatePostLikesAction,
};