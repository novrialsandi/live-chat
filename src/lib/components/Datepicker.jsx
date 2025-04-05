"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useClickOutside } from "../helpers/useClickOutside";

const DatePicker = ({ value, onChange }) => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(
		value ? new Date(value) : null
	);
	const [showCalendar, setShowCalendar] = useState(false);
	const [showAbove, setShowAbove] = useState(false);
	const inputRef = useRef(null);
	const calendarRef = useRef(null);
	const dropdownRef = useRef(null);
	const ref = useClickOutside(() => setShowCalendar(false));

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// Get month names and days of week
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const daysOfWeek = ["M", "T", "W", "Th", "F", "S", "Su"];

	// Initialize selected date from value prop
	useEffect(() => {
		if (value && !selectedDate) {
			setSelectedDate(new Date(value));
			// Set current month to the month of the provided value
			setCurrentMonth(new Date(value));
		}
	}, [value]);

	// Check if calendar should be positioned above
	useEffect(() => {
		if (showCalendar && inputRef.current && dropdownRef.current) {
			const inputRect = inputRef.current.getBoundingClientRect();
			const dropdownHeight = dropdownRef.current.offsetHeight;
			const viewportHeight = window.innerHeight;
			const spaceBelow = viewportHeight - inputRect.bottom;

			// Check if there's not enough space below
			if (spaceBelow < dropdownHeight + 10) {
				setShowAbove(true);
			} else {
				setShowAbove(false);
			}
		}
	}, [showCalendar]);

	// Get days in month
	const getDaysInMonth = (year, month) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (year, month) => {
		const day = new Date(year, month, 1).getDay();
		return day === 0 ? 6 : day - 1; // Adjust Sunday (0) to be last (6)
	};

	// Navigation handlers
	const handlePrevMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
		);
	};

	const handleNextMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
		);
	};

	// Date selection handler
	const handleDateClick = (day) => {
		const clickedDate = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth(),
			day
		);
		clickedDate.setHours(0, 0, 0, 0);

		if (clickedDate < today) return; // block past dates

		setSelectedDate(clickedDate);

		// Call onChange with the new date if provided
		if (onChange) {
			onChange(clickedDate);
		}

		setShowCalendar(false);
	};

	// Create calendar grid
	const renderCalendarDays = () => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();
		const daysInMonth = getDaysInMonth(year, month);
		const firstDayOfMonth = getFirstDayOfMonth(year, month);

		const days = [];

		// Empty cells for days before first day of month
		for (let i = 0; i < firstDayOfMonth; i++) {
			days.push(<td key={`empty-${i}`}></td>);
		}

		// Actual days of month
		for (let day = 1; day <= daysInMonth; day++) {
			const dayDate = new Date(year, month, day);
			dayDate.setHours(0, 0, 0, 0);

			const isPast = dayDate < today;

			const isSelected =
				selectedDate &&
				selectedDate.getDate() === dayDate.getDate() &&
				selectedDate.getMonth() === dayDate.getMonth() &&
				selectedDate.getFullYear() === dayDate.getFullYear();

			days.push(
				<td key={day} className="text-center p-0">
					<button
						onClick={() => !isPast && handleDateClick(day)}
						disabled={isPast}
						className={`block w-full text-sm leading-8 transition-colors rounded-full
		${isPast ? "text-gray-300 cursor-not-allowed" : ""}
		${isSelected && !isPast ? "border border-primary-blue" : ""}
		${
			!isSelected && !isPast
				? "border border-transparent hover:border-primary-lightGray"
				: ""
		}
	`}
					>
						{day}
					</button>
				</td>
			);
		}

		const rows = [];
		let cells = [];

		days.forEach((day, index) => {
			if (index % 7 === 0 && cells.length > 0) {
				rows.push(<tr key={index}>{cells}</tr>);
				cells = [];
			}
			cells.push(day);
		});

		if (cells.length > 0) {
			rows.push(<tr key="last">{cells}</tr>);
		}

		return rows;
	};

	// Format the selected date (DD/MM/YYYY)
	const formatDate = (date) => {
		if (!date) return "";

		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	};

	return (
		<>
			<svg
				width="20"
				height="20"
				viewBox="0 0 28 28"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M14.0061 8.80121H15.8921V15.4021L21.55 18.7591L20.607 20.3056L14.0061 16.3451V8.80121ZM15.2508 2.51465C8.31048 2.51465 2.69031 8.1474 2.69031 15.0877C2.69031 22.0281 8.31048 27.6608 15.2508 27.6608C22.2038 27.6608 27.8365 22.0281 27.8365 15.0877C27.8365 8.1474 22.2038 2.51465 15.2508 2.51465ZM15.2637 25.1462C9.70636 25.1462 5.20519 20.6451 5.20519 15.0878C5.20519 9.53045 9.70636 5.02928 15.2637 5.02928C20.821 5.02928 25.3221 9.53045 25.3221 15.0878C25.3221 20.6451 20.821 25.1462 15.2637 25.1462Z"
					fill={value ? "#2F80ED" : "#4f4f4f"}
				/>
			</svg>
			<div
				ref={calendarRef}
				className="relative w-[193px] border border-primary-darkGray rounded"
			>
				{/* Input field */}
				<input
					ref={inputRef}
					type="text"
					className="h-10 px-4 w-full outline-0 placeholder-primary-darkGray"
					value={formatDate(selectedDate)}
					onClick={() => setShowCalendar(!showCalendar)}
					placeholder="Set Date"
					readOnly
				/>

				<div
					onClick={() => setShowCalendar(!showCalendar)}
					className="absolute right-4 top-1/2 transform -translate-y-1/2"
				>
					<Image src={"/icons/date.svg"} alt="date" height={16} width={16} />
				</div>

				{showCalendar && (
					<div
						ref={(node) => {
							ref.current = node;
							dropdownRef.current = node;
						}}
						className={`absolute ${
							showAbove ? "bottom-12" : "top-12 "
						} z-10 -right-56 border border-primary-darkGray bg-white rounded-lg p-4 w-64`}
					>
						{/* Header with month/year and navigation */}
						<div className="relative flex justify-between mb-2">
							<button className="" onClick={handlePrevMonth}>
								<Image
									src="/icons/down.svg"
									alt="quick"
									width={20}
									height={20}
									className="rotate-90"
								/>{" "}
							</button>

							<div className="font-bold">
								{monthNames[currentMonth.getMonth()]}{" "}
								{currentMonth.getFullYear()}
							</div>

							<button className=" " onClick={handleNextMonth}>
								<Image
									src="/icons/down.svg"
									alt="quick"
									width={20}
									height={20}
									className="rotate-[270deg]"
								/>
							</button>
						</div>

						{/* Calendar grid */}
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr>
									{daysOfWeek.map((day, index) => (
										<th key={index} className="font-bold w-1/7 text-center">
											{day}
										</th>
									))}
								</tr>
							</thead>
							<tbody>{renderCalendarDays()}</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	);
};

export default DatePicker;
