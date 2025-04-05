import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import TextArea from "./TextArea";

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
	const deleteMenuRef = useRef(null);
	const [openDeleteMenu, setOpenDeleteMenu] = useState(null);

	const handleClickOutside = (event) => {
		if (
			deleteMenuRef.current &&
			!deleteMenuRef.current.contains(event.target)
		) {
			setOpenDeleteMenu(false);
		}
	};

	useEffect(() => {
		if (openDeleteMenu) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openDeleteMenu]);

	const handleMenuIconClick = (e) => {
		e.stopPropagation();
		setOpenDeleteMenu(true);
	};

	return (
		<div className="border-b border-gray-300 text-primary-darkGray py-3">
			<div
				className={` flex ${
					data.title && !isFocused ? "items-start" : "items-center"
				} justify-between py-2 text-left font-medium text-gray-800 transition`}
				onClick={onToggleAccordion}
			>
				<div
					className={`relative ${
						data.title && !isFocused ? "items-start" : "items-center"
					} flex `}
				>
					<div
						className="absolute left-0"
						onClick={(e) => {
							onEdit({ ...data, active: !data.active });
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
							onChange={(e) => onEdit({ ...data, title: e.target.value })}
						/>
					</div>
				</div>

				<div className="flex gap-3 text-sm pr-8">
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
							<div>{new Date(data.date).toLocaleDateString("en-GB")}</div>{" "}
						</>
					)}
					<motion.div
						animate={{ rotate: isOpen ? 180 : 0 }}
						className="cursor-pointer size-5"
					>
						<Image src="/icons/down.svg" alt="quick" width={20} height={20} />{" "}
					</motion.div>
					<div
						ref={deleteMenuRef}
						className="relative cursor-pointer"
						onClick={(e) => e.stopPropagation()}
					>
						<Image
							onClick={handleMenuIconClick}
							src="/icons/group-1910.svg"
							alt="quick"
							width={20}
							height={20}
						/>

						{openDeleteMenu && (
							<button
								className="absolute text-indicator-red text-start w-[126px] h-[43px] right-0 top-6 bg-white border border-primary-gray px-4 z-10 rounded-md cursor-pointer"
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

			{/* Content */}
			<motion.div
				initial={false}
				animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
			>
				<div className="px-4 py-2 pl-10 text-gray-600">{children}</div>
			</motion.div>
		</div>
	);
};

export default AccordionItem;
