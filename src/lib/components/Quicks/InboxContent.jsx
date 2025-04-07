import { useState, useEffect } from "react";
import TextInput from "../TextInput";
import Image from "next/image";
import AllChat from "./Chats/AllChat";
import RoomChat from "./Chats/RoomChat";
import { socketApi } from "@/lib/api/fetchApi";
import { useRoomStore, useChatsStore } from "@/lib/stores/chats";

const InboxContent = ({ setSelectedItem, setIsOpen }) => {
	const [isLoading, setIsLoading] = useState(true);

	const { selectedChat, setSelectedChat } = useChatsStore();
	const { rooms, setRooms } = useRoomStore();

	useEffect(() => {
		socketApi.connect();

		setIsLoading(true);

		socketApi.on("connect", () => {
			setIsLoading(false);
		});

		socketApi.on("disconnect", () => {
			setIsLoading(true);
		});

		socketApi.on("initial_chat_rooms", (initialRooms) => {
			setRooms(initialRooms);
		});

		socketApi.on("receive_message", (newMsg) => {
			setRooms((prevRooms) => {
				const updatedRooms = prevRooms.map((room) =>
					room.uuid === newMsg.chat_uuid
						? {
								...room,
								chat_messages: [...room.chat_messages, newMsg],
						  }
						: room
				);

				const updatedRoom = updatedRooms.find(
					(room) => room.uuid === newMsg.chat_uuid
				);

				setSelectedChat((prevChat) =>
					prevChat?.uuid === newMsg.chat_uuid && updatedRoom
						? {
								...prevChat,
								chat_messages: [...updatedRoom.chat_messages],
						  }
						: prevChat
				);

				return updatedRooms;
			});
		});

		socketApi.on("delete_message", ({ message_id }) => {
			setRooms((prevRooms) => {
				const targetRoom = prevRooms.find((room) =>
					room.chat_messages.some((msg) => msg.id === message_id)
				);

				if (!targetRoom) return prevRooms;

				const updatedRooms = prevRooms.map((room) =>
					room.uuid === targetRoom.uuid
						? {
								...room,
								chat_messages: room.chat_messages.filter(
									(msg) => msg.id !== message_id
								),
						  }
						: room
				);

				setSelectedChat((prevChat) =>
					prevChat && prevChat.uuid === targetRoom.uuid
						? {
								...prevChat,
								chat_messages: prevChat.chat_messages.filter(
									(msg) => msg.id !== message_id
								),
						  }
						: prevChat
				);

				return updatedRooms;
			});
		});

		socketApi.on("update_message", (updatedMsg) => {
			setRooms((prevRooms) => {
				const updatedRooms = prevRooms.map((room) => {
					if (room.uuid !== updatedMsg.chat_uuid) return room;

					const updatedMessages = room.chat_messages.map((msg) =>
						msg.id === updatedMsg.id ? updatedMsg : msg
					);

					return {
						...room,
						chat_messages: updatedMessages,
					};
				});

				// Update selectedChat jika sedang terbuka
				const updatedRoom = updatedRooms.find(
					(room) => room.uuid === updatedMsg.chat_uuid
				);

				setSelectedChat((prevChat) =>
					prevChat?.uuid === updatedMsg.chat_uuid && updatedRoom
						? {
								...prevChat,
								chat_messages: updatedRoom.chat_messages,
						  }
						: prevChat
				);

				return updatedRooms;
			});
		});

		return () => {
			socketApi.off("connect");
			socketApi.off("disconnect");
			socketApi.off("receive_message");
			socketApi.off("initial_chat_rooms");
			socketApi.disconnect();
		};
	}, []);

	console.log(selectedChat?.chat_messages);

	return (
		<div className=" h-full flex flex-col ">
			{selectedChat ? (
				<div className="flex px-6 py-4 justify-between border-b border-[#bdbdbd] items-center ">
					<div className="flex gap-4 items-center">
						<button
							className="cursor-pointer"
							onClick={() => setSelectedChat(null)}
						>
							<Image
								src="/icons/group-1920.svg"
								alt="quick"
								width={24}
								height={24}
								className="text-primary-blue"
							/>
						</button>
						<div>
							<div className="font-bold hover:underline text-primary-blue truncate max-w-[600px]">
								{selectedChat.name}
							</div>
							<div className="text-[#333333] text-sm">
								{
									[
										...new Set(
											selectedChat?.chat_messages.map((msg) => msg.user_id)
										),
									].length
								}{" "}
								participants
							</div>
						</div>
					</div>
					<button
						className="cursor-pointer"
						onClick={() => {
							setSelectedItem(null);
							setIsOpen(false);
						}}
					>
						<Image
							src="/icons/close_24px.svg"
							alt="quick"
							width={14}
							height={14}
							className="text-primary-blue m-1"
						/>
					</button>
				</div>
			) : (
				<div className="px-8 pt-6">
					<TextInput placeholder="Search" hasIconRight />
				</div>
			)}

			{isLoading ? (
				<div className="flex flex-col items-center gap-4 justify-center h-full">
					<div className="size-[85.40695190429688px] border-8 border-[#F8F8F8] border-t-[#c4c4c4] rounded-full animate-spin"></div>
					<div className="font-bold text-primary-darkGray">
						Loading Chats...
					</div>
				</div>
			) : selectedChat ? (
				<RoomChat />
			) : (
				<div className="flex px-8 flex-col w-full h-full">
					{rooms.map((item, index) => {
						return (
							<AllChat
								onChange={() => setSelectedChat(item)}
								item={item}
								index={index}
								rooms={rooms}
								key={index}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default InboxContent;
