"use client";

import React from "react";
import { ReactNode } from "react";

type ActionType =
	| { action: "copy-url" }
	| { action: "navigate"; target: string }
	| { action: "toggle-feature"; feature: string }
	| { action: "share"; platform: string }
	| { action: "contact" }
	| { action: "subscribe" }
	| { action: "custom"; id: string };

interface ClientActionHandlerProps {
	children: ReactNode;
}

export function ClientActionHandler({ children }: ClientActionHandlerProps) {
	// Handle actions client-side
	const handleAction = (actionData: ActionType) => {
		console.log("Action triggered:", actionData);

		switch (actionData.action) {
			case "navigate":
				if (actionData.target === "top") {
					window.scrollTo({ top: 0, behavior: "smooth" });
				} else {
					// Handle other navigation actions
					const element = document.getElementById(actionData.target);
					if (element) {
						element.scrollIntoView({ behavior: "smooth" });
					}
				}
				break;

			case "share":
				// Handle share actions
				const shareUrl = window.location.href;
				if (actionData.platform === "twitter") {
					window.open(
						`https://twitter.com/intent/tweet?url=${encodeURIComponent(
							shareUrl
						)}`
					);
				} else if (actionData.platform === "linkedin") {
					window.open(
						`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
							shareUrl
						)}`
					);
				} else if (actionData.platform === "whatsapp") {
					window.open(
						`https://wa.me/?text=${encodeURIComponent(shareUrl)}`
					);
				} else if (actionData.platform === "facebook") {
					window.open(
						`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
							shareUrl
						)}`
					);
				} else if (actionData.platform === "dev.to") {
					window.open(
						`https://dev.to/new?external_link=${encodeURIComponent(
							shareUrl
						)}`
					);
				}

				break;

			case "contact":
				// Open contact form/modal
				console.log("Opening contact form");
				break;

			case "subscribe":
				// Open newsletter subscription form/modal
				console.log("Opening subscription form");
				break;

			// Add more action handlers as needed
		}
	};

	// Clone the child and inject the action handler
	return React.cloneElement(
		children as React.ReactElement<{
			onAction?: (actionData: ActionType) => void;
		}>,
		{
			onAction: handleAction,
		}
	);
}
