import { DashboardLayout } from '@layouts/dashboard.layout';
import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
	return (
		<DashboardLayout>
			<main>
				<h2>Welcome to the dashboard!</h2>
				<p>You can do this, I believe in you.</p>
			</main>
			<nav>
				<Link to="/about">About</Link>
			</nav>
		</DashboardLayout>
	);
};
