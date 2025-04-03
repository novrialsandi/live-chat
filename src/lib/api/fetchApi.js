import axios from "axios";
import { getCookie } from "../helpers/cookie";

const token = getCookie("auth");

const fetchApi = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_SERVICE_HOST}/api`,
	headers: {
		"x-secret-key": process.env.NEXT_PUBLIC_SECRET_KEY,
		...(token && { Authorization: `Bearer ${token}` }),
	},
});

export default fetchApi;
