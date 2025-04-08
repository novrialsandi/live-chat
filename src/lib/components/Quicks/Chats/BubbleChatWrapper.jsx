// components/chat/Room/BubbleChatWrapper.jsx
import { useEffect, useRef } from "react";
import { socketApi } from "@/lib/api/fetchApi";
import { getCookie } from "@/lib/helpers/cookie";

const BubbleChatWrapper = ({ chat, children }) => {
	const ref = useRef();
	const session = getCookie("session");

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !chat.read_by?.includes(session.user_id)) {
					socketApi.emit("read_message", {
						message_id: chat.id,
						user_id: session.user_id,
					});
				}
			},
			{ threshold: 0.6 }
		);

		if (ref.current) observer.observe(ref.current);
		return () => {
			if (ref.current) observer.unobserve(ref.current);
		};
	}, [chat, session.user_id]);

	return <div ref={ref}>{children}</div>;
};

export default BubbleChatWrapper;
