import Image from "next/image";
import React, { useState } from "react";

const BubbleChat = ({ isMe, chat }) => {
	const [openMenu, setOpenMenu] = useState();

	const colors = [
		{
			primary: "#eedcff",
			bg: "#9b51e0",
			isMe: true,
		},
		{
			primary: "#d2f2ea",
			bg: "#43b78d",
		},
		{
			primary: "#fceed3",
			bg: "#e5a443",
		},
		{
			primary: "#d3e5ff",
			bg: "#4a90e2",
		},
		{
			primary: "#ffe6e6",
			bg: "#eb5757",
		},
		{
			primary: "#e0f7da",
			bg: "#66bb6a",
		},
	];

	const getUserColor = (isMe, name) => {
		if (isMe) return colors[0];

		const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
		const index = (hash % (colors.length - 1)) + 1;
		return colors[index];
	};
	const userColor = getUserColor(isMe, chat.name);

	return (
		<div
			className={`flex w-full px-2 ${isMe ? "justify-end" : "justify-start"}`}
		>
			<div className="max-w-[70%]">
				<div
					style={{ color: userColor.bg }}
					className={`${isMe ? "text-right" : ""}  font-bold`}
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
					</div>

					{openMenu && (
						<div className="absolute  border bg-white rounded-md w-32 h-20 flex flex-col right-0 top-6">
							<div className="h-full flex items-center rounded-t-md hover:bg-primary-lightGray">
								<div className="px-4">Edit</div>
							</div>
							<div className="h-full flex items-center border-t rounded-b-md hover:bg-primary-lightGray">
								<div className="px-4">Delete</div>
							</div>
						</div>
					)}
					<div className="text-primary-darkGray whitespace-pre-line ">
						{chat.message}
					</div>
					<div className="text-primary-darkGray text-sm">19.12</div>
				</div>
			</div>
		</div>
	);
};

export default BubbleChat;
