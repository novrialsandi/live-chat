import { useEffect, useRef } from "react";

export function useClickOutside(callback) {
	const ref = useRef();

	useEffect(() => {
		const handleClick = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				callback();
			}
		};

		document.addEventListener("click", handleClick, true);

		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	}, [callback]);

	return ref;
}
