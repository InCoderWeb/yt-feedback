"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useElementLoaded from "@/hooks/useElementLoaded";
import { BlurFade } from "./magicui/blur-fade";

// Simplified types
export interface NavItem {
	label: string;
	href: string;
	isActive?: boolean;
}

export interface CTAButton {
	label: string;
	href: string;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
}

export interface NavbarProps {
	navItems: NavItem[];
	ctaButton?: CTAButton;
	brandName?: string;
	logoSrc?: string;
}

export default function Navbar({
	navItems,
	ctaButton,
	brandName = "Brand",
	logoSrc = "/placeholder.svg?height=32&width=32",
}: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const navbarRef = useRef<HTMLElement | null>(null);
	const loaded = useElementLoaded(navbarRef);

	// Handle scroll effect
	useEffect(() => {
		if (scrolled) {
			document.body.style.paddingTop = "4rem";
		} else {
			document.body.style.paddingTop = "0";
		}
	}, [scrolled]);

	// Handle scroll event
	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleScroll = () => {
			if (window.scrollY > 10) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"fixed top-6 left-0 right-0 z-50 transition-all duration-300"
			)}
			ref={navbarRef}
		>
			<div className="mx-auto px-4 sm:px-6 w-fit bg-white/80 backdrop-blur-md shadow-sm rounded-full">
				<div className="flex h-16 items-center justify-center">
					{/* Logo */}
					<div className="flex-shrink-0 mr-8">
						<Link href="/" className="flex items-center">
							<div className="relative h-8 w-8 mr-2">
								<Image
									src={logoSrc}
									alt={`${brandName} logo`}
									width={32}
									height={32}
									className="object-contain"
									priority
								/>
							</div>
							<span className="text-xl font-bold text-primary">
								{brandName}
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{loaded ? (
							<>
								{navItems.map((item, index) => (
									<BlurFade
										key={item.href}
										delay={0.1 * index}
										inView
									>
										<Link
											href={item.href}
											className={cn(
												"text-sm font-medium relative transition-colors hover:text-primary group",
												item.isActive &&
													"text-primary font-semibold"
											)}
										>
											{item.label}
											<div className="w-2/5 h-0.5 -bottom-1.5 left-0 translate-2/3 absolute rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all group-hover:-bottom-1"></div>
										</Link>
									</BlurFade>
								))}
							</>
						) : (
							<>
								{navItems.map((i) => (
									<div
										key={i.href}
										className="w-20 h-6 bg-background/80 animate-pulse rounded-full"
									></div>
								))}
							</>
						)}
					</nav>

					{/* CTA Button */}
					{loaded ? (
						<>
							{ctaButton && (
								<BlurFade delay={0.2} inView>
									<div className="hidden md:block ml-8">
										<Button
											size="sm"
											variant={
												ctaButton.variant || "default"
											}
											className="rounded-full px-6"
											asChild
										>
											<Link href={ctaButton.href}>
												<ArrowUpRight className="size-5" />
												{ctaButton.label}
											</Link>
										</Button>
									</div>
								</BlurFade>
							)}
						</>
					) : (
						<>
							<div className="w-20 h-9 ml-4 bg-background/80 animate-pulse rounded-full"></div>
						</>
					)}
					{/* Mobile Menu Button */}
					<div className="block md:hidden">
						<button
							type="button"
							className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted/30 transition-colors"
							onClick={() => setIsOpen(!isOpen)}
							aria-expanded={isOpen}
						>
							<span className="sr-only">
								{isOpen ? "Close menu" : "Open menu"}
							</span>
							{isOpen ? (
								<X className="h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={cn(
					"md:hidden overflow-hidden transition-all duration-300 ease-in-out",
					isOpen ? "max-h-96" : "max-h-0"
				)}
			>
				<div className="bg-background/95 backdrop-blur-sm px-4 py-4 space-y-1 shadow-lg">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"block py-2 px-3 text-base font-medium rounded-md hover:bg-muted/20 transition-colors",
								item.isActive && "bg-muted/40 text-primary"
							)}
							onClick={() => setIsOpen(false)}
						>
							{item.label}
						</Link>
					))}
					{ctaButton && (
						<div className="pt-2">
							<Button
								className="w-full rounded-full"
								size="sm"
								variant={ctaButton.variant || "default"}
								asChild
							>
								<Link href={ctaButton.href}>
									{ctaButton.label}
								</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
