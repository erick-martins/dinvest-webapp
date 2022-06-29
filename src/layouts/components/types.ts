export type NavigationMenuLinkItem = {
	type: 'link';
	title: string;
	icon: React.ReactNode;
} & (
	| {
			route: string;
			selected: boolean;
	  }
	| {
			action: () => void;
	  }
);

export interface NavigationMenuItemSeparator {
	type: 'separator';
}

export type NavigationMenuItem = NavigationMenuLinkItem | NavigationMenuItemSeparator;

export interface NavigationProps {
	items: NavigationMenuItem[];
	logo: React.ReactNode;
	className?: string;
	logout: () => void;
	userName: string;
}
