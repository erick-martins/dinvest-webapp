import React from 'react';
import '@styles/styles.scss';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '@pages/dashboard.page';
import { SignIn } from '@pages/signin.page';
import { SignUp } from '@pages/signup.page';
import { AppRoutes } from './routes';
import { PrivateRoute } from '@components/private-route';

export const App: React.FC = () => {
	return (
		<div className="App">
			<Routes>
				<Route path={AppRoutes.Login} element={<SignIn />} />
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
		</div>
	);
};
