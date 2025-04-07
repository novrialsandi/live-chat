import axios from "axios";
import { io } from "socket.io-client";

const fetchApi = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_SERVICE_HOST}/api`,
	headers: {
		"x-secret-key": process.env.NEXT_PUBLIC_SECRET_KEY,
	},
});

export default fetchApi;

// Socket.io instance
export const socketApi = io(`${process.env.NEXT_PUBLIC_SERVICE_HOST}`, {
	path: "/socket",
	// extraHeaders: {
	// 	"x-secret-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
	// },
	autoConnect: false, // optional: so you can control when to connect
});
