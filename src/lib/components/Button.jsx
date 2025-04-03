const Button = ({
	className = "",
	isLoading = false,
	disabled = false,
	onClick = () => {},
	children,
	size = "medium", // small, medium, large
	primary = true,
}) => {
	const sizeDataClass = {
		small: "h-8",
		medium: "h-10",
		large: "h-12",
	};

	const handleClick = (e) => {
		if (e && typeof e.stopPropagation === "function") {
			e.stopPropagation();
		}
		if (!isLoading) {
			onClick(e);
		}
	};

	return (
		<button
			className={`min-w-24 ${className}  ${sizeDataClass[size]} font-bold  ${
				primary
					? "text-white bg-primary-blue"
					: "border text-primary-darkGray border-primary-darkGray"
			}  text-nowrap flex items-center justify-center rounded-md cursor-pointer`}
			disabled={disabled || isLoading}
			onClick={handleClick}
		>
			{isLoading ? (
				<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
