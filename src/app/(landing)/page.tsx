import { HeroSection } from "@/components/HeroSection";
import Navbar from "@/components/navbar";
import { customCTA, customNavItems } from "@/constants/navbar.constants";

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
				<div className="container mx-auto px-4 pt-24">
					<section className="py-20">
						<h1 className="text-4xl font-bold text-center">
							Fully Dynamic Navbar
						</h1>
						<p className="text-center mt-4 text-muted-foreground max-w-2xl mx-auto">
							This navbar is now completely customizable through
							props. Every aspect can be configured.
						</p>
					</section>

					{/* Add more content to demonstrate scrolling */}
					{Array.from({ length: 5 }).map((_, i) => (
						<section key={i} className="py-20 border-t">
							<h2 className="text-2xl font-bold">
								Section {i + 1}
							</h2>
							<p className="mt-4 text-muted-foreground">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Nullam euismod, nisl eget
								aliquam ultricies, nunc nisl aliquet nunc, quis
								aliquam nisl nunc quis nisl.
							</p>
						</section>
					))}
				</div>
			</main>
		</>
	);
}
