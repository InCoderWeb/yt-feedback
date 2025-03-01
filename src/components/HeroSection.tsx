"use client";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Particles } from "@/components/magicui/particles";
import { useEffect, useState } from "react";
import { MacbookScroll } from "./ui/macbook-scroll";
import { Safari } from "./magicui/safari";

export function HeroSection() {
	const { resolvedTheme } = useTheme();
	const [color, setColor] = useState("#dc143c");

	useEffect(() => {
		setColor(resolvedTheme === "dark" ? "#dc143c" : "#dc143c");
	}, [resolvedTheme]);
	return (
		<div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
			<span className="pointer-events-none w-full z-10 whitespace-pre-wrap text-center text-8xl font-semibold leading-none">
				<div className="overflow-hidden w-full hidden md:block">
					<MacbookScroll
						title={
							<motion.h1
								initial={{
									opacity: 0,
									y: 20,
								}}
								animate={{
									opacity: 1,
									y: [20, -5, 0],
								}}
								transition={{
									duration: 0.5,
									ease: [0.4, 0.0, 0.2, 1],
								}}
								className="text-2xl px-4 md:text-4xl lg:text-7xl font-bold text-neutral-700 dark:text-white max-w-5xl leading-8 lg:leading-snug text-center mx-auto "
							>
								Transform <Highlight>Feedback</Highlight> into
								Your Channel’s Secret Weapon
							</motion.h1>
						}
						src={`/heroImage.jpeg`}
						showGradient={true}
					/>
				</div>
				<div className="h-screen flex justify-center items-center flex-col relative p-4">
					<motion.h1
						initial={{
							opacity: 0,
							y: 20,
						}}
						animate={{
							opacity: 1,
							y: [20, -5, 0],
						}}
						transition={{
							duration: 0.5,
							ease: [0.4, 0.0, 0.2, 1],
						}}
						className="md:hidden text-2xl px-4 md:text-4xl lg:text-7xl font-bold text-neutral-700 dark:text-white max-w-5xl leading-8 lg:leading-snug text-center mx-auto "
					>
						Transform <Highlight>Feedback</Highlight> into Your
						Channel’s Secret Weapon
					</motion.h1>
					<Safari
						url="magicui.design"
						className="max-w-md w-full h-fit mt-6 shadow"
						imageSrc="/heroImage.jpeg"
					/>
				</div>
			</span>
			<Particles
				className="absolute inset-0 z-0"
				quantity={500}
				ease={80}
				color={color}
				refresh={true}
			/>
		</div>
	);
}
