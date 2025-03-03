"use client";

import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ReactNode, useState } from "react";
import { useTheme } from "next-themes";

// Define action types instead of function handlers
type ActionType =
	| { action: "copy-url" }
	| { action: "navigate"; target: string }
	| { action: "toggle-feature"; feature: string }
	| { action: "share"; platform: string }
	| { action: "contact" }
	| { action: "subscribe" }
	| { action: "custom"; id: string };

export interface ContextMenuItemType {
	type:
		| "item"
		| "separator"
		| "label"
		| "checkbox"
		| "radio-group"
		| "sub-menu";
	label?: string;
	icon?: ReactNode;
	shortcut?: string;
	disabled?: boolean;
	checked?: boolean;
	defaultValue?: string;
	options?: { value: string; label: string }[];
	subItems?: ContextMenuItemType[];
	// Use actionData instead of onClick
	actionData?: ActionType;
}

interface CustomContextMenuProps {
	triggerContent: ReactNode;
	items?: ContextMenuItemType[];
	showThemeToggle?: boolean;
	// Add an onAction prop to handle actions
	onAction?: (actionData: ActionType) => void;
}

export default function ReusableContextMenu({
	triggerContent,
	items,
	showThemeToggle = true,
	onAction,
}: CustomContextMenuProps) {
	const { setTheme, theme } = useTheme();
	const [checkboxStates, setCheckboxStates] = useState<
		Record<string, boolean>
	>({});

	// Handle actions internally
	const handleAction = (actionData?: ActionType) => {
		if (!actionData) return;

		// Handle special actions internally if needed
		if (actionData.action === "copy-url") {
			navigator.clipboard.writeText(window.location.href);
			return;
		}

		// Pass other actions to parent handler
		if (onAction) {
			onAction(actionData);
		}
	};

	// Handle checkbox state changes
	const handleCheckboxChange = (label?: string, checked?: boolean) => {
		if (!label) return;

		setCheckboxStates((prev) => ({
			...prev,
			[label]: checked || false,
		}));

		// You can also trigger an action when checkbox changes
		if (onAction) {
			onAction({
				action: "toggle-feature",
				feature: label,
			});
		}
	};

	const renderMenuItems = (items?: ContextMenuItemType[]) => {
		if (!items) return null;

		return items.map((item, index) => {
			if (item.type === "separator") {
				return <ContextMenuSeparator key={index} />;
			}
			if (item.type === "label") {
				return (
					<ContextMenuLabel key={index}>
						{item.label}
					</ContextMenuLabel>
				);
			}
			if (item.type === "checkbox") {
				const isChecked = item.label
					? checkboxStates[item.label] ?? item.checked ?? false
					: false;

				return (
					<ContextMenuCheckboxItem
						key={index}
						checked={isChecked}
						onCheckedChange={(checked) =>
							handleCheckboxChange(item.label, checked)
						}
					>
						{item.label}
						{item.shortcut && (
							<ContextMenuShortcut>
								{item.shortcut}
							</ContextMenuShortcut>
						)}
					</ContextMenuCheckboxItem>
				);
			}
			if (item.type === "radio-group") {
				return (
					<ContextMenuRadioGroup
						key={index}
						value={item.defaultValue || theme}
						onValueChange={setTheme}
					>
						{item.label && (
							<>
								<ContextMenuLabel inset>
									{item.label}
								</ContextMenuLabel>
								<ContextMenuSeparator />
							</>
						)}
						{item.options?.map((option, idx) => (
							<ContextMenuRadioItem
								key={idx}
								value={option.value}
							>
								{option.label}
							</ContextMenuRadioItem>
						))}
					</ContextMenuRadioGroup>
				);
			}
			if (item.type === "sub-menu") {
				return (
					<ContextMenuSub key={index}>
						<ContextMenuSubTrigger inset>
							{item.label}
						</ContextMenuSubTrigger>
						<ContextMenuSubContent className="w-48">
							{renderMenuItems(item.subItems)}
						</ContextMenuSubContent>
					</ContextMenuSub>
				);
			}
			return (
				<ContextMenuItem
					key={index}
					inset
					disabled={item.disabled}
					onClick={() => handleAction(item.actionData)}
				>
					{item.label}
					{item.icon}
					{item.shortcut && (
						<ContextMenuShortcut>
							{item.shortcut}
						</ContextMenuShortcut>
					)}
				</ContextMenuItem>
			);
		});
	};

	// Theme options setup
	const themeOptions = [
		{ value: "system", label: "System" },
		{ value: "light", label: "Light" },
		{ value: "dark", label: "Dark" },
	];

	return (
		<ContextMenu>
			<ContextMenuTrigger className="w-full">
				{triggerContent || "Right click here"}
			</ContextMenuTrigger>
			<ContextMenuContent className="w-56 bg-red-50 dark:bg-gray-900">
				{/* Custom menu items (if any) */}
				{renderMenuItems(items)}

				{/* Show separator if we have theme toggle AND custom items */}
				{showThemeToggle && items && items.length > 0 && (
					<ContextMenuSeparator />
				)}
				{/* Theme toggle in submenu */}
				{showThemeToggle && (
					<ContextMenuSub>
						<ContextMenuSubTrigger inset>
							Theme
						</ContextMenuSubTrigger>
						<ContextMenuSubContent className="w-48">
							<ContextMenuRadioGroup
								value={theme}
								onValueChange={setTheme}
							>
								{themeOptions.map((option, idx) => (
									<ContextMenuRadioItem
										key={idx}
										value={option.value}
									>
										{option.label}
									</ContextMenuRadioItem>
								))}
							</ContextMenuRadioGroup>
						</ContextMenuSubContent>
					</ContextMenuSub>
				)}
			</ContextMenuContent>
		</ContextMenu>
	);
}
