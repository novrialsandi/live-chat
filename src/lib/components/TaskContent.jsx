import { useState } from "react";
import TextInput from "./TextInput";
import Image from "next/image";
import Button from "./Button";
import Dropdown from "./Dropdown";

const TaskContent = () => {
	const [isLoading, setIsLoading] = useState(true);

	const dropdownItem = [
		{ id: 1, label: "Personal Errands", value: "personal" },
		{ id: 2, label: "Urgent To-Do", value: "urgent" },
	];

	setTimeout(() => {
		setIsLoading(false);
	}, 2000);

	return (
		<div className="p-6 h-full flex flex-col ">
			<div className="flex w-full justify-between">
				<div className="w-[289px] flex justify-center ">
					<div className="w-fit">
						<Dropdown
							items={dropdownItem}
							defaultValue="My Tasks"
							type="single"
							popupTopPosition={50}
							popupPosition="right"
						/>
					</div>
				</div>
				<Button>New Task</Button>
			</div>
			{isLoading ? (
				<div className="flex flex-col items-center gap-4 justify-center h-full">
					<div className="size-[85.40695190429688px] border-8 border-[#F8F8F8] border-t-[#c4c4c4] rounded-full animate-spin"></div>
					<div className="font-bold text-primary-darkGray">
						Loading Chats...
					</div>
				</div>
			) : (
				<div className="flex flex-col w-full h-full">
					{/* <div>halo</div> */}
				</div>
			)}
		</div>
	);
};

export default TaskContent;
