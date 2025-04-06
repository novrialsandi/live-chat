// @ts-nocheck
import Cookie from "cookie-universal";

const cookies = Cookie();

export const getCookie = (cookieName) => {
	return cookies.get(cookieName);
};

export const setCookie = (cookieName, value) => {
	// Set default expiration to 1 year from now
	const expirationDate = new Date();
	expirationDate.setFullYear(expirationDate.getFullYear() + 1);

	// await cookies.set(cookieName, payload, { path: '/', domain: cookieNames.domain })
	return cookies.set(cookieName, value, {
		expires: expirationDate,
		path: "/",
	});
};

export const removeCookie = async (cookieName) => {
	cookies.remove(cookieName);
};
