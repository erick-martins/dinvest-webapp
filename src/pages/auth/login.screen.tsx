import { Input } from '@components/form/input';
import { AuthenticationLayout } from '@layouts/authentication.layout';
import React from 'react';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
	const login = () => {};
	return (
		<AuthenticationLayout
			title="Welcome to the dinvest!"
			rightTitle="Welcome to the dinvest!"
			subtitle="You can do this, I believe in you."
			rightSubtitle="You can do this, I believe in you.">
			<div className="me-md-5 d-flex flex-column">
				<div className="form-group w-100">
					<Input name="email" type="email" placeholder="email" label="email" className="mb-2" />
					<Input
						name="password"
						type="password"
						placeholder="senha"
						label="senha"
						className="mb-2"
					/>
					<button type="submit" className="btn btn-primary mt-4" onClick={login}>
						Entrar
					</button>
				</div>
			</div>
		</AuthenticationLayout>
	);
};
