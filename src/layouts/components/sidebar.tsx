import { DashboardRoutes } from '@app/routes';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavigationLinkItem } from './navigation-link-tem';
import { NavigationProps, NavigationMenuItem } from './types';

export const Sidebar: React.FC<NavigationProps> = ({
	logo,
	items,
	className,
	logout,
	userName
}) => {
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
		<div
			className={`d-flex flex-column flex-shrink-0 text-dark dashboard__sidebar ${className}`}
			style={{ width: '280px' }}>
			<div className="d-flex flex-column px-3 pt-3">{logo}</div>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">{items.map(renderItem)}</ul>
			<hr />
			<div className="px-3 pb-3">
				<Dropdown>
					<Dropdown.Toggle
						href="#"
						className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
						id="dropdownUser1"
						data-bs-toggle="dropdown"
						aria-expanded="false">
						<img
							src="https://github.com/mdo.png"
							alt=""
							width="32"
							height="32"
							className="rounded-circle me-2"
						/>
						<strong>{userName}</strong>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item eventKey="1" href={DashboardRoutes.Profile}>
							Meu perfil
						</Dropdown.Item>
						<Dropdown.Item eventKey="2" onClick={logout}>
							Logout
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	);
};
