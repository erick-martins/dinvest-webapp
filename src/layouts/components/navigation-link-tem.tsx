import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavigationMenuLinkItem } from './types';

export const NavigationLinkItem: React.FC<NavigationMenuLinkItem> = ({ icon, title, ...props }) => {
	// eslint-disable-next-line prettier/prettier
	const selected = 'selected' in props ? props.selected : false;
	return (
		<Nav.Link
			href={'route' in props ? props.route : undefined}
			onClick={'action' in props ? props.action : undefined}
			className={`nav-link ${selected ? 'active' : 'text-light'} ${selected ? 'nav-item' : ''}`}>
			{icon}
			<span className="ms-4">{title}</span>
		</Nav.Link>
	);
};
