import HeroSection from "@/app/(landing)/components/HeroSection";
import Navbar from "@/components/navbar";
import { customCTA, customNavItems } from "@/constants/navbar.constants";
import Services from "@/app/(landing)/components/Services";

export default function Home() {
	return (
		<>
			<main className="min-h-screen">
				<Navbar
					navItems={customNavItems}
					ctaButton={customCTA}
					brandName="YT Feedback"
					logoSrc="/logo.png"
				/>
				<HeroSection />
				<Services />
			</main>
		</>
	);
}
