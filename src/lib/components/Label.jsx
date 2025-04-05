import { useState, useEffect, useRef } from "react";
import { useClickOutside } from "../helpers/useClickOutside";

const Label = ({ value = [], onChange }) => {
	const option = [
		{
			id: 1,
			label: "Important ASAP",
			value: "important",
			color: "bg-stickers-lightBlue",
		},
		{
			id: 2,
			label: "Offline Meeting",
			value: "offline",
			color: "bg-stickers-softPeach",
		},
		{
			id: 3,
			label: "Virtual Meeting",
			value: "virtual",
			color: "bg-stickers-softYellow",
		},
		{ id: 4, label: "ASAP", value: "ASAP", color: "bg-stickers-mint" },
		{
			id: 5,
			label: "Client Related",
			value: "client",
			color: "bg-stickers-lightGreen",
		},
		{
			id: 6,
			label: "Self Task",
			value: "self",
			color: "bg-stickers-lightLavender",
		},
		{
			id: 7,
			label: "Appointments",
			value: "appointments",
			color: "bg-stickers-softPink",
		},
		{
			id: 8,
			label: "Court Related",
			value: "court",
			color: "bg-stickers-darkblue",
		},
	];

	const handleSelectLabel = (item) => {
		const isSelected = value.find((label) => label.id === item.id);
		if (isSelected) {
			onChange(value.filter((label) => label.id !== item.id));
		} else {
			onChange([...value, item]);
		}
	};

	const [openOption, setOpenOption] = useState(false);
	const [selectedLabels, setSelectedLabels] = useState([]);
	const [showAbove, setShowAbove] = useState(false);
	const buttonRef = useRef(null);
	const dropdownRef = useRef(null);
	const ref = useClickOutside(() => setOpenOption(false));

	useEffect(() => {
		if (openOption && buttonRef.current && dropdownRef.current) {
			const buttonRect = buttonRef.current.getBoundingClientRect();
			const dropdownHeight = dropdownRef.current.offsetHeight;
			const viewportHeight = window.innerHeight;
			const spaceBelow = viewportHeight - buttonRect.bottom;

			// Check if there's not enough space below
			if (spaceBelow < dropdownHeight + 10) {
				setShowAbove(true);
			} else {
				setShowAbove(false);
			}
		}
	}, [openOption]);

	return (
		<div className="relative min-h-12 py-2 w-full bg-[#f9f9f9] rounded-md">
			<button
				ref={buttonRef}
				onClick={() => setOpenOption(!openOption)}
				className={`flex gap-6 items-center h-full w-full rounded-md text-primary-darkGray`}
			>
				<svg
					className="w-5 h-5 min-w-[20px] min-h-[20px]"
					width="20"
					height="20"
					viewBox="0 0 29 31"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M23.005 1.25732H11.116C9.80952 1.25732 8.75246 2.3889 8.75246 3.77194H20.6295C21.936 3.77194 23.005 4.90352 23.005 6.28656V22.6316L25.3804 23.8889V3.77194C25.3804 2.3889 24.3114 1.25732 23.005 1.25732ZM18.2543 8.80118V25.1085L13.254 22.8328L12.3157 22.4053L11.3774 22.8328L6.37719 25.1085V8.80118H18.2543ZM6.37712 6.28655H18.2542C19.5607 6.28655 20.6296 7.41813 20.6296 8.80117V28.9181L12.3157 25.1462L4.00171 28.9181V8.80117C4.00171 7.41813 5.07065 6.28655 6.37712 6.28655Z"
						fill="#4f4f4f"
					/>
				</svg>

				<div className="flex flex-wrap gap-2">
					{value.length === 0 ? (
						<div className="text-primary-darkGray">No label</div>
					) : (
						value.map((label) => (
							<div
								key={label.id}
								className={`text-sm px-3 py-1 rounded ${label.color} font-medium`}
							>
								{label.label}
							</div>
						))
					)}
				</div>
			</button>

			{openOption && (
				<div
					ref={(node) => {
						ref.current = node;
						dropdownRef.current = node;
					}}
					className={`absolute ${
						showAbove ? "bottom-full" : "top-full"
					} w-[277px] h-[323px] bg-white border border-primary-gray rounded-md z-10`}
				>
					<div className="flex flex-col justify-between h-full p-4 text-sm text-gray-700">
						{option.map((item) => {
							const isSelected = value.find((label) => label.id === item.id);
							return (
								<div
									key={item.id}
									className={`flex ${
										item.color
									} items-center rounded-md px-4 py-1 cursor-pointer border ${
										isSelected ? "border-primary-blue" : "border-transparent"
									} hover:border-primary-blue`}
									onClick={() => handleSelectLabel(item)}
								>
									<span className="text-primary-darkGray text-sm font-medium">
										{item.label}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default Label;
