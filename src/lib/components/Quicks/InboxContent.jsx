import { useState } from "react";
import TextInput from "../TextInput";
import Image from "next/image";

const InboxContent = () => {
	const [isLoading, setIsLoading] = useState(true);

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
	}, 2000);

	return (
		<div className="p-6 h-full flex flex-col ">
			<TextInput placeholder="Search" hasIconRight />
			{isLoading ? (
				<div className="flex flex-col items-center gap-4 justify-center h-full">
					<div className="size-[85.40695190429688px] border-8 border-[#F8F8F8] border-t-[#c4c4c4] rounded-full animate-spin"></div>
					<div className="font-bold text-primary-darkGray">
						Loading Chats...
					</div>
				</div>
			) : (
				<div className="flex flex-col w-full h-full">
					{chats.map((item, index) => {
						return (
							<div
								key={index}
								className={`flex gap-4 py-[22px] ${
									index !== chats.length - 1
										? "border-b border-primary-gray"
										: ""
								}`}
							>
								<div className="relative flex flex-none h-[34px] w-[51px]">
									<div className="size-[34px] absolute flex justify-center items-center rounded-full bg-primary-lightGray">
										<Image
											src="/icons/person_24px.svg"
											alt="quick"
											width={12}
											height={12}
										/>
									</div>
									<div className="size-[34px] absolute left-4 flex justify-center items-center rounded-full bg-primary-blue">
										<Image
											src="/icons/group-1607.svg"
											alt="quick"
											width={16}
											height={16}
										/>
									</div>
								</div>
								<div>
									<div className="flex gap-4">
										<div className="text-primary-blue font-bold">
											{item.subject}
										</div>
										<div className="text-primary-darkGray flex-none text-sm">
											{item.date}
										</div>
									</div>
									<div className="text-primary-darkGray font-bold text-sm">
										{item.name} :
									</div>
									<div className="text-primary-darkGray text-sm">
										{item.message}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default InboxContent;
