import { useState } from "react";
import TextInput from "../TextInput";
import Image from "next/image";
import AllChat from "./Chats/AllChat";
import RoomChat from "./Chats/RoomChat";

const InboxContent = ({ setSelectedItem, setIsOpen }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [selectedChat, setSelectedChat] = useState(null);

	const chats = [
		{
			subject: "109220-Naturalization",
			date: "January 1,2021 19:10",
			name: "Cameron Phillips",
			message: "Please check this out!",
			group: true,
		},
		{
			subject:
				"Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
			date: "02/06/2021 10:45",
			name: "Ellen",
			message: "Hey, please read.",
			group: true,
		},
		{
			subject: "8405-Diana SALAZAR MUNGUIA",
			date: "01/06/2021 12:19",
			name: "Cameron Phillips",
			message:
				"I understand your initial concerns and thats very valid, Elizabeth. But you ...",
			group: true,
		},
		{
			subject: "FastVisa Support",
			date: "01/06/2021 12:19",
			name: "",
			message: "Hey there! Welcome to your inbox.",
			group: false,
		},
	];

	setTimeout(() => {
		setIsLoading(false);
	}, 1000);

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
								{selectedChat.subject}
							</div>
							<div className="text-[#333333] text-sm">3 participans</div>
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
					{chats.map((item, index) => {
						return (
							<AllChat
								onChange={() => setSelectedChat(item)}
								item={item}
								index={index}
								chats={chats}
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
