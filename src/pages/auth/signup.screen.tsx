import { AuthenticationLayout } from '@layouts/authentication.layout';
import React from 'react';
import { Link } from 'react-router-dom';

export const SignUp: React.FC = () => {
	return (
		<AuthenticationLayout
			title="Welcome to the dinvest!"
			rightTitle="Welcome to the dinvest!"
			subtitle="You can do this, I believe in you."
			rightSubtitle="You can do this, I believe in you.">
			<main>
				<h2>Welcome to the SignUp!</h2>
				<p>You can do this, I believe in you.</p>
			</main>
			<nav>
				<Link to="/dashboard">About</Link>
			</nav>
		</AuthenticationLayout>
	);
};
