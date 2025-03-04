"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function PricingPage() {
	const [isYearly, setIsYearly] = useState(false);

	const plans = [
		{
			name: "Free",
			description:
				"Essential features for individuals and small projects",
			price: {
				monthly: 0,
				yearly: 0,
			},
			features: [
				"Up to 3 projects",
				"Basic analytics",
				"24-hour support response time",
				"1GB storage",
				"Community access",
			],
			cta: "Get Started",
			popular: false,
		},
		{
			name: "Personal",
			description: "Perfect for professionals and growing projects",
			price: {
				monthly: 12,
				yearly: 120,
			},
			features: [
				"Unlimited projects",
				"Advanced analytics",
				"4-hour support response time",
				"10GB storage",
				"API access",
				"Custom domains",
				"Remove branding",
			],
			cta: "Start Free Trial",
			popular: true,
		},
		{
			name: "Business",
			description: "For teams and organizations with advanced needs",
			price: {
				monthly: 49,
				yearly: 490,
			},
			features: [
				"Everything in Personal",
				"Unlimited team members",
				"1-hour support response time",
				"100GB storage",
				"Advanced security",
				"Custom integrations",
				"Dedicated account manager",
				"SSO authentication",
			],
			cta: "Contact Sales",
			popular: false,
		},
	];

	return (
		<div className="container mx-auto px-4 py-16 md:py-24">
			<div className="text-center mb-16">
				<h1 className="text-4xl font-bold tracking-tight mb-4">
					Simple, Transparent Pricing
				</h1>
				<p className="text-muted-foreground text-xl max-w-2xl mx-auto">
					Choose the perfect plan for your needs. Always know what
					you'll pay with our transparent pricing.
				</p>

				<div className="flex items-center justify-center mt-8 space-x-2">
					<Label
						htmlFor="billing-toggle"
						className="text-sm font-medium"
					>
						Monthly
					</Label>
					<Switch
						id="billing-toggle"
						checked={isYearly}
						onCheckedChange={setIsYearly}
					/>
					<Label
						htmlFor="billing-toggle"
						className="text-sm font-medium flex items-center"
					>
						Yearly
						<Badge
							variant="outline"
							className="ml-2 bg-primary/10 text-primary"
						>
							Save 20%
						</Badge>
					</Label>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{plans.map((plan, index) => {
					const price = isYearly
						? plan.price.yearly
						: plan.price.monthly;
					const period = isYearly ? "/year" : "/month";

					return (
						<BlurFade key={plan.name} inView delay={0.5 * index} className="h-full">
							<Card
								key={plan.name}
								className={`flex flex-col bg-background ${
									plan.popular
										? "border-primary shadow-lg relative bg-primary/10"
										: "border-gray-400"
								}`}
							>
								{plan.popular && (
									<Badge className="absolute -top-3 right-4 px-3 py-1">
										Most Popular
									</Badge>
								)}
								<CardHeader>
									<CardTitle>{plan.name}</CardTitle>
									<CardDescription>
										{plan.description}
									</CardDescription>
									<div className="mt-4">
										<span className="text-4xl font-bold">
											${price}
										</span>
										{price > 0 && (
											<span className="text-muted-foreground ml-2">
												{period}
											</span>
										)}
									</div>
								</CardHeader>
								<CardContent className="flex-grow">
									<ul className="space-y-3">
										{plan.features.map((feature) => (
											<li
												key={feature}
												className="flex items-start"
											>
												<Check className="h-5 w-5 text-primary shrink-0 mr-2" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</CardContent>
								<CardFooter>
									<Button
										className="w-full"
										variant={
											plan.popular ? "default" : "outline"
										}
									>
										{plan.cta}
									</Button>
								</CardFooter>
							</Card>
						</BlurFade>
					);
				})}
			</div>
		</div>
	);
}
