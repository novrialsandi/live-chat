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
	openDeleteMenu,
	onToggleDeleteMenu,
	onCloseDeleteMenu,
}) => {
	const daysLeft = Math.ceil(
		(new Date(data.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
	);

	// Refs for the menu components
	const deleteMenuRef = useRef(null);
	const menuContainerRef = useRef(null);
	const menuIconRef = useRef(null);

	// Track click count and timing for double-click detection
	const [lastClickTime, setLastClickTime] = useState(0);

	// Custom click outside handler that excludes the parent container
	useEffect(() => {
		function handleDocumentClick(e) {
			// Only run this logic if delete menu is open
			if (!openDeleteMenu) return;

			// If the click is outside both the delete menu AND the parent container
			if (
				deleteMenuRef.current &&
				!deleteMenuRef.current.contains(e.target) &&
				menuContainerRef.current &&
				!menuContainerRef.current.contains(e.target)
			) {
				onCloseDeleteMenu();
			}
		}

		// Add event listener when delete menu is open
		if (openDeleteMenu) {
			document.addEventListener("mousedown", handleDocumentClick);
		}

		// Clean up
		return () => {
			document.removeEventListener("mousedown", handleDocumentClick);
		};
	}, [openDeleteMenu, onCloseDeleteMenu]);

	const handleMenuIconClick = (e) => {
		e.stopPropagation();
		const currentTime = new Date().getTime();
		const timeDiff = currentTime - lastClickTime;

		// If the time between clicks is less than 300ms, consider it a double-click
		if (timeDiff < 300) {
			// On double-click, close the menu if it's open
			if (openDeleteMenu) {
				onCloseDeleteMenu();
			}
		} else {
			// Single click behavior - toggle the menu
			onToggleDeleteMenu();
		}

		setLastClickTime(currentTime);
	};

	return (
		<div className="border-b border-gray-300 text-primary-darkGray">
			<div
				className=" flex items-center justify-between py-3 text-left font-medium text-gray-800 transition"
				onClick={onToggleAccordion}
			>
				<div className="relative  flex items-center">
					<div className="absolute left-0" onClick={(e) => e.stopPropagation()}>
						<Image
							src="/icons/group-1917.svg"
							alt="quick"
							width={20}
							height={20}
						/>
					</div>
					<div className="pl-10 " onClick={(e) => e.stopPropagation()}>
						<TextArea value={data.title} placeholder="Type Task Title" />
					</div>
				</div>

				<div className="flex items-center gap-3 text-sm pr-8">
					{data.date && (
						<>
							<div className="text-indicator-red text-sm">
								{daysLeft > 0
									? `${daysLeft} Day${daysLeft > 1 ? "s" : ""} Left`
									: "Expired"}
							</div>
							<div>{new Date(data.date).toLocaleDateString("en-US")}</div>
						</>
					)}
					<motion.div
						animate={{ rotate: isOpen ? 180 : 0 }}
						className="cursor-pointer"
					>
						<Image src="/icons/down.svg" alt="quick" width={20} height={20} />{" "}
					</motion.div>
					<div
						ref={menuContainerRef}
						className="relative cursor-pointer"
						onClick={(e) => e.stopPropagation()}
					>
						<div ref={menuIconRef}>
							<Image
								onClick={handleMenuIconClick}
								src="/icons/group-1910.svg"
								alt="quick"
								width={20}
								height={20}
							/>
						</div>
						{openDeleteMenu && (
							<button
								ref={deleteMenuRef}
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
				className="overflow-hidden"
			>
				<div className="px-4 py-2 pl-10 text-gray-600">{children}</div>
			</motion.div>
		</div>
	);
};

export default AccordionItem;
