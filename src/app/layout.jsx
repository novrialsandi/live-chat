import { Lato } from "next/font/google";
import "./globals.css";
import Layout from "@/lib/layout/Layout";
import Quicks from "@/lib/components/Quicks";

const lato = Lato({
	subsets: ["latin"],
	weight: ["300", "400", "700"],
	variable: "--font-lato",
});

export const metadata = {
	title: "Simpul Tech",
	description: "Skill Challenge",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${lato.variable} antialiased bg-[#333333]`}>
				<Layout>{children}</Layout>
				<Quicks />
			</body>
		</html>
	);
}
