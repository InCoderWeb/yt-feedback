import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import AnimatedCursor from "react-animated-cursor";

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-poppins",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "YT Feedback - AI-Powered YouTube Growth & Video Optimization",
	description:
		"Boost your YouTube channel with AI-driven feedback, video title generation, SEO-friendly descriptions, smart tags, and comment analysis. Optimize your content and grow faster!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.variable}>
				{children}
				<AnimatedCursor
					innerSize={20}
					outerSize={20}
					color="220, 20, 60"
					outerAlpha={0.2}
					innerScale={2}
					outerScale={5}
					clickables={[
						"a",
						'input[type="text"]',
						'input[type="email"]',
						'input[type="number"]',
						'input[type="submit"]',
						'input[type="image"]',
						"label[for]",
						"select",
						"textarea",
						"button",
						".link",
					]}
				/>
			</body>
		</html>
	);
}
