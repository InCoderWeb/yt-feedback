import HeroSection from "@/app/(landing)/components/HeroSection";
import Navbar from "@/components/navbar";
import { customCTA, customNavItems } from "@/constants/navbar.constants";
import PricingPage from "./components/pricing-page";
import { FeaturesSection } from "./components/Services";
import { ContactSection } from "./components/contact";

export default function Home() {
	return (
		<>
			<main className="min-h-screen container mx-auto px-4">
				<Navbar
					navItems={customNavItems}
					ctaButton={customCTA}
					brandName="YT Feedback"
					logoSrc="/logo.png"
				/>
				<HeroSection />
				<FeaturesSection />
				<PricingPage/>
				<ContactSection />
			</main>
		</>
	);
}
