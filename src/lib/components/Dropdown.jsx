"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "./Button";
import Image from "next/image";

const Dropdown = ({
	label = "",
	popupTopPosition = 75, // should be changeable based on the height of the whole page
	popupPosition = "left",
	disabled = false,
	popupZIndexClass = "z-10",
	popupStyle = {},
	btnToggleClass = "",
	placeholder = "Select Value",
	items = [],
	onStateChange = () => {},
	type = "single",
	hint = "",
	defaultValue = "",
}) => {
	const [multipleSelectedItems, setMultipleSelectedItems] = useState([]);
	const [singleSelectedItem, setSingleSelectedItem] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef(null);

	const onSelectItem = useCallback(
		(item) => {
			switch (type) {
				case "single":
					setSingleSelectedItem(item.label);
					onStateChange(item.value);
					break;
				case "multi":
					setMultipleSelectedItems((prevItems) => [...prevItems, item]);
					onStateChange([...multipleSelectedItems, item]);
					break;
				default:
					break;
			}
		},
		[
			type,
			multipleSelectedItems,
			setSingleSelectedItem,
			setMultipleSelectedItems,
			onStateChange,
		]
	);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div ref={wrapperRef} className="relative flex  flex-col gap-2">
			{label && <span>{label}</span>}
			<Button
				disabled={disabled}
				className={`${btnToggleClass}`}
				placeholder={placeholder}
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
				primary={false}
			>
				<div className="flex px-4 items-center justify-between gap-2">
					<span
						className={`${
							!singleSelectedItem &&
							!multipleSelectedItems.length &&
							!defaultValue
								? "text-icon/disabled"
								: "text-text/light"
						}`}
					>
						{!singleSelectedItem && !multipleSelectedItems.length
							? defaultValue
								? defaultValue
								: placeholder
							: type === "single"
							? singleSelectedItem
							: `${multipleSelectedItems.length} Selected`}
					</span>
					<span
						style={{
							transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
							transition: "transform 0.15s ease",
						}}
					>
						<Image src="/icons/down.svg" alt="quick" width={20} height={20} />{" "}
					</span>
				</div>
			</Button>
			{type === "multi" && multipleSelectedItems.length > 0 && (
				<div className="flex space-x-2">
					{multipleSelectedItems.map((item) => (
						<div className="inline-flex items-center gap-2 rounded bg-background/componnent-input px-2 py-0.5 text-text/light dark:text-text/light">
							<span>{item.label}</span>
						</div>
					))}
				</div>
			)}
			<p className="text-caption/4-light tracking-wider text-text/light">
				{hint}
			</p>

			{isOpen && (
				<div
					className={`absolute text-nowrap w-[288px] translate-x-[50%] bg-white h-fit min-w-[140px]  overflow-auto rounded-lg border-[1px]  ${popupZIndexClass} ${
						popupPosition === "right" ? "right-1/2" : "left-0"
					}`}
					style={{
						top: `${popupTopPosition}px`,
						...popupStyle,
					}}
				>
					<div
						className={` relative rounded-lg`}
						onClick={() => setIsOpen(!isOpen)}
					>
						<div className="flex h-full flex-col">
							{items && items.length ? (
								items.map((item, index) => {
									return (
										<button
											className={`flex gap-2 p-2 font-bold text-primary-darkGray cursor-pointer ${
												index !== items.length - 1
													? "border-b border-primary-darkGray"
													: ""
											}`}
											key={item.id}
											onClick={() => onSelectItem(item)}
										>
											{item.label}
										</button>
									);
								})
							) : (
								<span>No Value to select</span>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
