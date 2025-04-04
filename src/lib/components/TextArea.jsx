import React, { useState, useRef, useEffect } from "react";

const TextArea = ({
	name = "",
	id = `id-${Date.now()}`,
	placeholder = "Type here ...",
	value: initialValue = "",
	className = "",
	debounceTime = null, // in milliseconds
	onKeyDown = () => {},
	onChange = () => {},
}) => {
	const [value, setValue] = useState(initialValue);
	const fieldRef = useRef(null);
	const timerRef = useRef(null);

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	const debounce = (e) => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => {
			setValue(e.target.value);
			onChange(e);
		}, debounceTime);
	};

	const handleChange = (e) => {
		if (debounceTime) {
			debounce(e);
		} else {
			setValue(e.target.value);
			onChange(e);
		}
	};

	return (
		<div
			className={`w-[380px] text-primary-darkGray border border-primary-gray rounded-md font-bold flex flex-col space-y-2`}
		>
			<textarea
				suppressHydrationWarning
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				ref={fieldRef}
				autoComplete="off"
				rows={1}
				onKeyDown={onKeyDown}
				onChange={handleChange}
				className="flex w-[380px] h-10 pl-4 py-2 resize-none min-h-8 rounded-lg outline-0 focus:border-active focus:ring-0 placeholder-primary-darkGray"
			/>
		</div>
	);
};

export default TextArea;
