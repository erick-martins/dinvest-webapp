import React from 'react';
import '@styles/styles.scss';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '@pages/dashboard/dashboard.screen';
import { Login } from '@pages/auth/login.screen';
import { SignUp } from '@pages/auth/signup.screen';
import { AppRoutes } from './routes';
import { PrivateRoute } from '@components/private-route';

export const App: React.FC = () => {
	return (
		<Routes>
			<Route path={AppRoutes.Login} element={<Login />} />
			<Route path={AppRoutes.SignUp} element={<SignUp />} />
			<Route
				path={AppRoutes.Dashboard}
				element={
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};
