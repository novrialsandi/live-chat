import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import { getCookie } from "@/lib/helpers/cookie";

const AllChat = ({ item, rooms, index, onChange = () => {} }) => {
	const session = getCookie("session");

	return (
		<div
			className={`flex gap-4 py-[22px] relative ${
				index !== rooms.length - 1 ? "border-b border-primary-gray" : ""
			}`}
		>
			{item.chat_messages.length > 0 &&
				!item.chat_messages[item.chat_messages.length - 1]?.read_by.includes(
					session.user_id
				) && (
					<div className="size-[10px] bg-indicator-red rounded-full absolute right-0 top-2/3 -translate-y-1/2"></div>
				)}

			<div className="relative flex flex-none h-[34px] w-[51px]">
				{item.group && (
					<div className="size-[34px] absolute flex justify-center items-center rounded-full bg-primary-lightGray">
						<Image
							src="/icons/person_24px.svg"
							alt="quick"
							width={12}
							height={12}
						/>
					</div>
				)}
				<div
					className={`size-[34px] absolute ${
						item.group ? "left-4" : "left-2"
					}  flex justify-center items-center rounded-full bg-primary-blue`}
				>
					{item.group ? (
						<Image
							src="/icons/group-1607.svg"
							alt="quick"
							width={16}
							height={16}
						/>
					) : (
						<div className="text-white">F</div>
					)}
				</div>
			</div>
			<div>
				<div className="flex relative gap-4">
					<div
						onClick={onChange}
						className="text-primary-blue cursor-pointer hover:underline font-bold"
					>
						{item?.name}
					</div>
					{item.chat_messages.length > 0 && (
						<div className="text-primary-darkGray flex-none text-sm">
							{dayjs(
								item.chat_messages[item.chat_messages.length - 1]?.createdAt
							).format("DD/MM/YYYY HH:mm")}
						</div>
					)}
				</div>

				{item.chat_messages.length > 0 && item.group && (
					<div className="text-primary-darkGray font-bold text-sm">
						{item.chat_messages[item.chat_messages.length - 1]?.name} :
					</div>
				)}
				<div className="text-primary-darkGray text-sm truncate max-w-[450px]">
					{item.chat_messages[item.chat_messages.length - 1]?.message}
				</div>
			</div>
		</div>
	);
};

export default AllChat;
