import React, { useMemo } from 'react';
import { FCProps } from '@definitions/types';
import Container from 'react-bootstrap/Container';
import { Sidebar } from '@layouts/components/sidebar';
import { DashboardRoutes } from '@app/routes';

import HorizontalLogo from '@assets/images/h-logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartLine,
	faExchangeAlt,
	faLightbulb,
	faSignOut,
	faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { NavigationMenuItem } from './components/types';
import { NavBar } from './components/navbar';
import { useUserProfile } from '@domains/user/user.hook';
import { useAuthentication } from '@domains/auth/context';

export const DashboardLayout: React.FC<FCProps> = ({ children }) => {
	const location = useLocation();
	const { profile } = useUserProfile();
	const { logout } = useAuthentication();

	const menuItems = useMemo(() => {
		const menuItems: NavigationMenuItem[] = [
			{
				type: 'link',
				title: 'Home',
				icon: <FontAwesomeIcon icon={faChartLine} />,
				route: DashboardRoutes.Home,
				selected: location.pathname === DashboardRoutes.Home
			},
			{
				type: 'link',
				title: 'Transações',
				icon: <FontAwesomeIcon icon={faExchangeAlt} />,
				route: DashboardRoutes.Transactions,
				selected: location.pathname === DashboardRoutes.Transactions
			},
			{
				type: 'link',
				title: 'Insights',
				icon: <FontAwesomeIcon icon={faLightbulb} />,
				route: DashboardRoutes.Insights,
				selected: location.pathname === DashboardRoutes.Insights
			},
			{
				type: 'link',
				title: 'Perfil',
				icon: <FontAwesomeIcon icon={faUserCircle} />,
				route: DashboardRoutes.Profile,
				selected: location.pathname === DashboardRoutes.Profile
			},
			{
				type: 'separator'
			},
			{
				type: 'link',
				title: 'Sair',
				icon: <FontAwesomeIcon icon={faSignOut} />,
				action: logout
			}
		];
		return menuItems;
	}, [location]);

	return (
		<Container className="d-md-flex h-100">
			<NavBar
				items={menuItems}
				logo={<img src={HorizontalLogo} className="logo" />}
				className="d-xs-block d-md-none"
				logout={logout}
				userName={profile?.name ?? ''}
			/>
			<Sidebar
				items={menuItems}
				logo={<img src={HorizontalLogo} className="logo" />}
				className="d-md-flex d-none"
				logout={logout}
				userName={profile?.name ?? ''}
			/>
			{children}
		</Container>
	);
};
