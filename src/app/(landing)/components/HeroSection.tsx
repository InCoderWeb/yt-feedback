"use client";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { TextHighlight } from "@/components/ui/TextHighlight";
import { Particles } from "@/components/magicui/particles";
import { useEffect, useState } from "react";
import { Safari } from "@/components/magicui/safari";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function HeroSection() {
	const { resolvedTheme } = useTheme();
	const [color, setColor] = useState("#dc143c");

	useEffect(() => {
		setColor(resolvedTheme === "dark" ? "#dc143c" : "#dc143c");
	}, [resolvedTheme]);
	return (
		<div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
			<span className="pointer-events-none w-full z-10 whitespace-pre-wrap text-center text-8xl font-semibold leading-none">
				<div className="overflow-hidden w-full h-screen flex justify-center flex-col items-center relative">
					<BlurFade delay={0.1} inView>
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
							className="text-[clamp(1.5rem,2.5vw,6rem)] md:text-[clamp(2rem,2.5vw,6rem)] pt-8 px-4 font-bold text-neutral-600/90 dark:text-white md:max-w-[40vw] leading-8 lg:leading-snug text-center mx-auto"
						>
							Transform <TextHighlight>AI Feedback</TextHighlight>{" "}
							into Your Channel’s{" "}
							<TextHighlight>Secret Weapon</TextHighlight>
						</motion.h1>
					</BlurFade>
					<BlurFade delay={0.2} inView>
						<div className="w-full p-4 h-[calc(100vh-30rem)] xl:h-[calc(100vh-26rem)] flex justify-center items-center">
							<Safari
								url="ytfeedback.ai"
								className="w-full h-full max-h-full mt-6 rounded-lg"
								// imageSrc="/heroImage.jpeg"
								imageSrc="https://img.freepik.com/free-vector/coming-soon-background-with-focus-light-effect_1017-31453.jpg?t=st=1741013161~exp=1741016761~hmac=bb1e2c11da127d7b09f7d665555a52253c9cdfa9eb6ce85deefce0a4bc9bbfb1&w=1060"
							/>
						</div>
					</BlurFade>
				</div>
				{/* <div className="md:hidden h-screen flex justify-center items-center flex-col relative p-4">
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
						className="md:hidden text-2xl px-4 md:text-4xl lg:text-7xl font-bold text-neutral-700 dark:text-white max-w-5xl leading-8 lg:leading-snug text-center mx-auto"
					>
						Transform <Highlight>Feedback</Highlight> into Your
						Channel’s Secret Weapon
					</motion.h1>
					
				</div> */}
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
