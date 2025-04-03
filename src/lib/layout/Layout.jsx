import Image from "next/image";
import search from "@/lib/icons/group-1610.svg";

const Layout = ({ children }) => {
	return (
		<div className="flex min-h-screen">
			<div className="w-[285px] h-screen border-r-1 border-[#F2F2F2]"></div>
			<div>
				<div className="h-[58px] w-[calc(100vw-285px)] p-6 flex items-center bg-primary-darkGray ">
					<Image src={search} alt="search" width={16} height={16} />
				</div>
				<div className="h-[calc(100vh-58px)]">{children}</div>
			</div>
		</div>
	);
};

export default Layout;
