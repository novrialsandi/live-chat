"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import InboxContent from "./InboxContent";
import TaskContent from "./TaskContent";

const initialVariants = [
	{
		icon: "/icons/group-1906.svg",
		active: "/icons/group-1908.svg",
		name: "Inbox",
		color: "bg-indicator-purple",
	},
	{
		icon: "/icons/group-1662.svg",
		active: "/icons/group-1907.svg",
		name: "Task",
		color: "bg-indicator-orange",
	},
];

const Quicks = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const handleSelect = (name) => {
		if (selectedItem === name) {
			setIsOpen(false);
			setSelectedItem(null);
		} else {
			setSelectedItem(name);
		}
	};

	const reorderedVariants = selectedItem
		? [
				initialVariants.find((v) => v.name === selectedItem),
				...initialVariants.filter((v) => v.name !== selectedItem),
		  ].filter(Boolean)
		: initialVariants;

	return (
		<div className="absolute bottom-4 right-4">
			<div
				className={`relative flex flex-row-reverse items-center ${
					selectedItem ? "gap-8" : "gap-6"
				}`}
			>
				<div
					className={`flex ${
						selectedItem ? "absolute right-4" : ""
					} cursor-pointer items-center justify-center size-[68px] rounded-full ${
						selectedItem ? "bg-primary-darkGray" : "bg-primary-blue"
					}`}
					onClick={() => {
						setIsOpen(!isOpen);
						setSelectedItem(null);
					}}
				>
					<Image src="/icons/shape.svg" alt="quick" width={18} height={32} />
				</div>

				{isOpen && (
					<>
						{reorderedVariants.map((item, index) => (
							<motion.div
								key={item.name}
								className={`size-[60px] relative flex items-center justify-center rounded-full transition-all ${
									selectedItem === item.name
										? item.color + " size-[68px]"
										: "bg-[#f2f2f2]"
								}`}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.2, delay: index * 0.1 }}
								onClick={() => handleSelect(item.name)}
							>
								<Image
									src={selectedItem === item.name ? item.active : item.icon}
									alt={item.name}
									width={27}
									height={27}
									className="object-contain"
								/>
								{!selectedItem && (
									<div className="absolute -top-8 font-bold text-[#f2f2f2]">
										{item.name}
									</div>
								)}
							</motion.div>
						))}
					</>
				)}
			</div>

			{selectedItem && (
				<div
					className={`absolute w-[734px] h-[737px] bg-white border rounded-lg border-[#BDBDBD] right-0 bottom-22 transform translate-x-[0%] translate-y-[0%]`}
				>
					{selectedItem === "Task" && <TaskContent />}
					{selectedItem === "Inbox" && <InboxContent />}
				</div>
			)}
		</div>
	);
};

export default Quicks;
