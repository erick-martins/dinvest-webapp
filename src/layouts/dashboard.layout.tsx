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
import { useTranslation } from 'react-i18next';

export const DashboardLayout: React.FC<FCProps> = ({ children }) => {
	const location = useLocation();
	const { profile } = useUserProfile();
	const { logout } = useAuthentication();
	const { t } = useTranslation();

	const menuItems = useMemo(() => {
		const menuItems: NavigationMenuItem[] = [
			{
				type: 'link',
				title: t('dashboard.home.pageTitle'),
				icon: <FontAwesomeIcon icon={faChartLine} />,
				route: DashboardRoutes.Home,
				selected: location.pathname === DashboardRoutes.Home
			},
			{
				type: 'link',
				title: t('dashboard.transactions.pageTitle'),
				icon: <FontAwesomeIcon icon={faExchangeAlt} />,
				route: DashboardRoutes.Transactions,
				selected: location.pathname === DashboardRoutes.Transactions
			},
			{
				type: 'link',
				title: t('dashboard.insights.pageTitle'),
				icon: <FontAwesomeIcon icon={faLightbulb} />,
				route: DashboardRoutes.Insights,
				selected: location.pathname === DashboardRoutes.Insights
			},
			{
				type: 'link',
				title: t('dashboard.profile.pageTitle'),
				icon: <FontAwesomeIcon icon={faUserCircle} />,
				route: DashboardRoutes.Profile,
				selected: location.pathname === DashboardRoutes.Profile
			},
			{
				type: 'separator'
			},
			{
				type: 'link',
				title: t('dashboard.menu.logoutLabel'),
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
			<div className="d-block flex-grow-1 h-100">{children}</div>
		</Container>
	);
};
