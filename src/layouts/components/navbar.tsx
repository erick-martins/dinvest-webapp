import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { NavigationLinkItem } from './navigation-link-tem';
import { NavigationMenuItem, NavigationProps } from './types';
import { DashboardRoutes } from '@app/routes';

export const NavBar: React.FC<NavigationProps> = ({ logo, items, className }) => {
	const renderItem = (item: NavigationMenuItem, index: number) => {
		if (item.type === 'link') {
			return <NavigationLinkItem {...item} key={`${item.title}`} />;
		}
		if (item.type === 'separator') {
			return <hr key={index} />;
		}

		return null;
	};
	return (
		<Navbar
			bg="dark"
			variant="dark"
			expand="lg"
			fixed="top"
			className={`navbar navbar-light bg-light dashboard__navbar ${className}`}>
			<Navbar.Brand href={DashboardRoutes.Home}>{logo}</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3 mb-2" />
			<Navbar.Collapse id="basic-navbar-nav">{items.map(renderItem)}</Navbar.Collapse>
		</Navbar>
	);
};
