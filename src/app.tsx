import React from 'react';
import '@styles/styles.scss';
import { Routes, Route } from 'react-router-dom';
import { DashboardScreen } from '@pages/dashboard/dashboard.screen';
import { LoginScreen } from '@pages/auth/login.screen';
import { SignUpScreen } from '@pages/auth/signup.screen';
import { AppRoutes, DashboardRoutes } from './routes';
import { PrivateRoute } from '@components/private-route';
import { InsightsScreen } from '@pages/insights/insights.screen';
import { TransactionsScreen } from '@pages/transactions/transactions.screen';
import { ProfileScreen } from '@pages/profile/profile.screen';
import { RestorePassScreen } from '@pages/auth/restore.screen';

export const App: React.FC = () => {
	return (
		<Routes>
			<Route path={AppRoutes.Login} element={<LoginScreen />} />
			<Route path={AppRoutes.SignUp} element={<SignUpScreen />} />
			<Route path={AppRoutes.RestorePassword} element={<RestorePassScreen />} />

			<Route path={DashboardRoutes.Home} element={<PrivateRoute screen={DashboardScreen} />} />
			<Route path={DashboardRoutes.Insights} element={<PrivateRoute screen={InsightsScreen} />} />
			<Route
				path={DashboardRoutes.Transactions}
				element={<PrivateRoute screen={TransactionsScreen} />}
			/>
			<Route path={DashboardRoutes.Profile} element={<PrivateRoute screen={ProfileScreen} />} />
		</Routes>
	);
};
