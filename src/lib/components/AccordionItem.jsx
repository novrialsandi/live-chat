import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const AccordionItem = ({ data, children, onDelete = () => {} }) => {
	const daysLeft = Math.ceil(
		(new Date(data.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
	);

	const [isOpen, setIsOpen] = useState(false);
	const [deleteMenu, setDeleteMenu] = useState(false);

	return (
		<div className="border-b border-gray-300">
			<button
				className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-100 transition"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="flex items-center">
					<div className="w-">
						<Image
							src="/icons/group-1917.svg"
							alt="quick"
							width={20}
							height={20}
						/>
					</div>
					<span>{data.title || "halo"}</span>
				</div>

				<div className="flex items-center gap-2">
					<div>
						{daysLeft > 0
							? `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`
							: "Expired"}
					</div>
					<div>{new Date(data.date).toLocaleDateString("en-US")}</div>
					<motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
						<Image src="/icons/down.svg" alt="quick" width={20} height={20} />{" "}
					</motion.div>
					<div className="relative" onClick={(e) => e.stopPropagation()}>
						<Image
							onClick={() => setDeleteMenu(!deleteMenu)}
							src="/icons/group-1910.svg"
							alt="quick"
							width={20}
							height={20}
						/>
						{deleteMenu && (
							<button
								className="absolute right-0 top-4 bg-white border border-primary-gray p-2 z-10 shadow-lg rounded-md"
								onClick={() => {
									onDelete(data.uuid);
									setDeleteMenu(false);
								}}
							>
								Delete
							</button>
						)}
					</div>
				</div>
			</button>

			{/* Content */}
			<motion.div
				initial={false}
				animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
				className="overflow-hidden"
			>
				<div className="px-4 py-2 text-gray-600">{children}</div>
			</motion.div>
		</div>
	);
};

export default AccordionItem;
