import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import TextArea from "./TextArea";
import { useClickOutside } from "../helpers/useClickOutside";

const AccordionItem = ({
	data,
	children,
	onDelete = () => {},
	onEdit = () => {},
	isOpen,
	onToggleAccordion,
}) => {
	const [isFocused, setIsFocused] = useState(false);

	const daysLeft = Math.ceil(
		(new Date(data.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
	);

	// Refs for the menu components
	const [openDeleteMenu, setOpenDeleteMenu] = useState(null);
	const ref = useClickOutside(() => setOpenDeleteMenu(false));

	return (
		<div className="border-b border-gray-300 text-primary-darkGray py-3">
			<div
				className={` flex ${
					data.title && !isFocused ? "items-start" : "items-center"
				} justify-between py-2 text-left font-medium text-gray-800 transition`}
			>
				<div
					className={`relative ${
						data.title && !isFocused ? "items-start " : "items-center"
					} flex `}
				>
					<div
						className="absolute left-0 pt-0.5"
						onClick={(e) => {
							onEdit(data.uuid, { active: !data.active });
							e.stopPropagation();
						}}
					>
						<Image
							src={`/icons/group-${data.active ? "1917" : "1918"}.svg`}
							alt="quick"
							width={20}
							height={20}
						/>
					</div>
					<div className="pl-10 " onClick={(e) => e.stopPropagation()}>
						<TextArea
							isFocused={isFocused}
							setIsFocused={setIsFocused}
							active={data.active}
							value={data.title}
							placeholder="Type Task Title"
							onChange={(e) => onEdit(data.uuid, { title: e.target.value })}
						/>
					</div>
				</div>

				<div className="flex gap-3 text-sm pt-0.5 pr-8 font-normal">
					{data.date && (
						<>
							<div
								className={` ${
									data.active ? "" : "hidden"
								} text-indicator-red text-sm`}
							>
								{daysLeft > 0
									? `${daysLeft} Day${daysLeft > 1 ? "s" : ""} Left`
									: "Expired"}
							</div>
							<div className="">
								{new Date(data.date).toLocaleDateString("en-GB")}
							</div>{" "}
						</>
					)}
					<div
						className="cursor-pointer size-5"
						onClick={() => {
							onToggleAccordion();
						}}
					>
						<Image
							className="duration-300 tranlatetion-all"
							src="/icons/down.svg"
							alt="expand"
							width={20}
							height={20}
							style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
						/>
					</div>
					<div
						className="relative cursor-pointer"
						onClick={(e) => e.stopPropagation()}
					>
						<Image
							onClick={(e) => {
								e.stopPropagation();
								setOpenDeleteMenu(!openDeleteMenu);
							}}
							src="/icons/group-1910.svg"
							alt="quick"
							width={20}
							height={20}
						/>

						{openDeleteMenu && (
							<button
								ref={ref}
								className="absolute hover:bg-primary-lightGray/40 text-indicator-red text-start w-[126px] h-[43px] right-0 top-6 bg-white border border-primary-gray px-4 z-10 rounded-md cursor-pointer"
								onClick={() => {
									onDelete(data.uuid);
								}}
							>
								Delete
							</button>
						)}
					</div>
				</div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="px-4 py-2 pl-10 text-gray-600">{children}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AccordionItem;
