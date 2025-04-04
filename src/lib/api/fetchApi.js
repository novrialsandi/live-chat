import axios from "axios";

const fetchApi = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_SERVICE_HOST}/api`,
	headers: {
		"x-secret-key": process.env.NEXT_PUBLIC_SECRET_KEY,
	},
});

export default fetchApi;
