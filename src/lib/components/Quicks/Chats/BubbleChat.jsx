import Image from "next/image";
import React, { useState } from "react";
import { useClickOutside } from "@/lib/helpers/useClickOutside";
import { socketApi } from "@/lib/api/fetchApi";
import { useChatsStore } from "@/lib/stores/chats";

const BubbleChat = ({ isMe, chat }) => {
	const [openMenu, setOpenMenu] = useState(false);
	const ref = useClickOutside(() => setOpenMenu(false));
	const { setEditMessage } = useChatsStore();

	const colors = [
		{ primary: "#eedcff", bg: "#9b51e0", isMe: true },
		{ primary: "#d2f2ea", bg: "#43b78d" },
		{ primary: "#fceed3", bg: "#e5a443" },
		{ primary: "#d3e5ff", bg: "#4a90e2" },
		{ primary: "#ffe6e6", bg: "#eb5757" },
		{ primary: "#e0f7da", bg: "#66bb6a" },
	];

	const getUserColor = (isMe, name) => {
		if (isMe) return colors[0];
		const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
		const index = (hash % (colors.length - 1)) + 1;
		return colors[index];
	};

	const userColor = getUserColor(isMe, chat.name);

	const handleEditMessage = () => {
		setEditMessage(chat);
		setOpenMenu(false);
	};

	const handleDeleteMessage = () => {
		if (!chat.id) return;
		socketApi.emit("delete_message", { message_id: chat.id });
		setOpenMenu(false);
	};

	return (
		<div
			className={`flex w-full px-2 ${isMe ? "justify-end" : "justify-start"}`}
		>
			<div className="max-w-[70%]">
				<div
					style={{ color: userColor.bg }}
					className={`${isMe ? "text-right" : ""} font-bold`}
				>
					{chat.name}
				</div>
				<div
					style={{ backgroundColor: userColor.primary }}
					className="rounded-md px-2 py-1.5 relative space-y-1"
				>
					<div
						className={`absolute ${
							isMe ? "-left-6" : "-right-6"
						} top-0 cursor-pointer`}
						onClick={() => setOpenMenu(!openMenu)}
					>
						<Image
							alt="menu"
							src={"/icons/group-1909.svg"}
							height={20}
							width={20}
						/>
						{openMenu && (
							<div
								ref={ref}
								className={`absolute ${
									isMe ? "right-0" : ""
								} top-6 w-32 bg-white border border-primary-darkGray rounded-md flex flex-col overflow-hidden z-10`}
							>
								{isMe ? (
									<>
										<button
											onClick={handleEditMessage} // 👈 tambahkan handler
											className="h-10 px-4 text-start text-primary-blue hover:bg-primary-lightGray"
										>
											Edit
										</button>
										<button
											onClick={handleDeleteMessage}
											className="h-10 px-4 text-start border-t border-primary-darkGray text-indicator-red hover:bg-primary-lightGray"
										>
											Delete
										</button>
									</>
								) : (
									<button className="h-10 px-4 text-start hover:bg-primary-lightGray">
										Reply
									</button>
								)}
							</div>
						)}
					</div>

					<div className="text-primary-darkGray whitespace-pre-line">
						{chat.message}
					</div>
					<div className="text-primary-darkGray text-sm">19.12</div>
				</div>
			</div>
		</div>
	);
};

export default BubbleChat;
