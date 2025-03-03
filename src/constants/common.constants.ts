import { ContextMenuItemType } from "@/components/ContextMenu";

export const menuItems: ContextMenuItemType[] = [
	{
		type: "item",
		label: "Go to Top",
		actionData: { action: "navigate", target: "top" },
	},
	{ type: "separator" },
	{
		type: "sub-menu",
		label: "Share",
		subItems: [
			{
				type: "item",
				label: "Twitter",
				actionData: { action: "share", platform: "twitter" },
			},
			{
				type: "item",
				label: "LinkedIn",
				actionData: { action: "share", platform: "linkedin" },
			},
		],
	},
];
