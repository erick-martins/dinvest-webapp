import React from 'react';
import { Link } from 'react-router-dom';

export const SignIn: React.FC = () => {
	return (
		<>
			<main>
				<h2>Welcome to the Signin!</h2>
				<p>You can do this, I believe in you.</p>
			</main>
			<nav>
				<Link to="/dashboard">About</Link>
			</nav>
		</>
	);
};
