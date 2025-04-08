import TextArea from "../../TextArea";
import Button from "../../Button";
import { useEffect, useRef, useState } from "react";
import { getCookie, setCookie } from "@/lib/helpers/cookie";
import { useChatsStore } from "@/lib/stores/chats";
import BubbleChat from "./BubbleChat";
import fetchApi, { socketApi } from "@/lib/api/fetchApi";

const randomId = Date.now().toString();
const randomNumber = Math.floor(Math.random() * 90000) + 10000; // Generate 5-digit random number

if (!getCookie("session")) {
	setCookie("session", {
		user_id: randomId,
		name: `user_${randomNumber}`,
	});
}

const RoomChat = () => {
	const { selectedChat, editMessage, replyMessage, setReplyMessage } =
		useChatsStore();

	const chatContainerRef = useRef(null);
	const [loadingPost, setLoadingPost] = useState(false);
	const [loadingRoom, setLoadingRoom] = useState(false);
	const [showNewMessageButton, setShowNewMessageButton] = useState(false);
	const session = getCookie("session");

	const [message, setMessage] = useState(() => {
		return {
			message: "",
			user_id: session.user_id,
			name: session.name,
		};
	});

	const postMessage = () => {
		setLoadingPost(true);

		const payload = {
			chat_uuid: selectedChat.uuid,
			message: message.message,
			name: message.name,
			user_id: message.user_id,
			reply_id: replyMessage ? replyMessage.id : null,
		};

		if (editMessage) {
			socketApi.emit("edit_message", {
				message_id: editMessage.id,
				message: payload.message,
			});
		} else {
			socketApi.emit("send_message", payload);
		}

		setLoadingPost(false);
		setReplyMessage(null);

		setMessage((prev) => ({
			...prev,
			message: "",
		}));
	};

	useEffect(() => {
		if (editMessage) {
			setMessage((prev) => ({
				...prev,
				message: editMessage.message,
			}));
		}
	}, [editMessage]);

	const firstUnreadIndex = selectedChat.chat_messages.findIndex(
		(chat) => !chat.read_by.includes(session.user_id)
	);

	useEffect(() => {
		const container = chatContainerRef.current;
		if (!container || selectedChat.chat_messages.length === 0) return;

		const lastMessage =
			selectedChat.chat_messages[selectedChat.chat_messages.length - 1];
		const isMe = lastMessage.user_id === session.user_id;

		const isNearBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight <
			100;

		if (isNearBottom || isMe) {
			container.scrollTop = container.scrollHeight;
		} else {
			setShowNewMessageButton(true);
		}
	}, [selectedChat.chat_messages, session.user_id]);

	const handleScrollToBottom = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
			setShowNewMessageButton(false);
		}
	};

	return (
		<div className="h-full p-4 scroll-wrapper flex flex-col gap-4 relative">
			<div
				className="scroll-content overflow-y-auto flex-col space-y-3 h-full"
				ref={chatContainerRef}
				onScroll={() => {
					const container = chatContainerRef.current;
					if (!container) return;

					const isNearBottom =
						container.scrollHeight -
							container.scrollTop -
							container.clientHeight <
						100;

					if (isNearBottom) {
						setShowNewMessageButton(false);
					}
				}}
			>
				{loadingRoom ? (
					<div className="w-full h-full flex items-center justify-center">
						<div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
					</div>
				) : selectedChat.chat_messages.length > 0 ? (
					selectedChat.chat_messages.map((chat, index) => {
						const isMe = chat.user_id === session.user_id;
						const isNew = index === firstUnreadIndex;

						const currentDate = new Date(chat.createdAt).toDateString();
						const previousDate =
							index > 0
								? new Date(
										selectedChat.chat_messages[index - 1].createdAt
								  ).toDateString()
								: null;

						const isFirstOfDay = index === 0 || currentDate !== previousDate;

						return (
							<div key={index}>
								{/* New message indicator in chat */}
								{isNew && (
									<div className="h-3.5 px-2 flex items-center justify-between gap-8">
										<div className="border-t w-full border-indicator-red"></div>
										<div className="text-lg text-nowrap font-bold text-indicator-red">
											New Message
										</div>
										<div className="border-t w-full border-indicator-red"></div>
									</div>
								)}

								{/* Date separator */}
								{!isNew && isFirstOfDay && (
									<div className="h-3.5 px-2 flex items-center justify-between gap-8">
										<div className="border-t w-full border-primary-darkGray"></div>
										<div className="text-nowrap font-bold text-primary-darkGray">
											{currentDate}
										</div>
										<div className="border-t w-full border-primary-darkGray"></div>
									</div>
								)}

								<BubbleChat chat={chat} isMe={isMe} />
							</div>
						);
					})
				) : (
					<p className="text-gray-400 h-full text-center flex items-center justify-center">
						No messages yet.
					</p>
				)}
			</div>

			{/* Sticky New Message button */}
			{showNewMessageButton && (
				<div className="fixed bottom-20 left-1/2 -translate-x-1/2">
					<button
						onClick={handleScrollToBottom}
						className="bg-[#E9F3FF] text-primary-blue px-4 py-2 rounded-md font-bold cursor-pointer transition"
					>
						New Message
					</button>
				</div>
			)}

			{/* Input area */}
			<div className="flex gap-4 items-end">
				<TextArea
					isChat={true}
					replyMessage={replyMessage}
					value={message.message}
					onChange={(e) =>
						setMessage((prev) => ({
							...prev,
							message: e.target.value,
						}))
					}
				/>
				<Button
					onClick={postMessage}
					disabled={!message.message || loadingPost}
					isLoading={loadingPost}
				>
					Send
				</Button>
			</div>
		</div>
	);
};

export default RoomChat;
