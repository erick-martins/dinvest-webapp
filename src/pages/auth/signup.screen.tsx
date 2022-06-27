import React, { useEffect } from 'react';
import { Input } from '@components/form/input';
import { useSignUpFormValidation } from '@domains/auth/form-validation.hook';
import { AuthenticationLayout } from '@layouts/authentication.layout';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/form/button';
import { AppRoutes } from '@app/routes';

export const SignUp: React.FC = () => {
	const { t } = useTranslation();
	const { email, password, repeatPass, name, submit, loading, accountCreated, error } =
		useSignUpFormValidation();
	const navigate = useNavigate();

	useEffect(() => {
		if (accountCreated) {
			navigate(AppRoutes.Dashboard);
		}
	}, [accountCreated]);

	return (
		<AuthenticationLayout
			title="Welcome to the dinvest!"
			rightTitle="Welcome to the dinvest!"
			subtitle="You can do this, I believe in you."
			rightSubtitle={
				<p className="text-dark-off-1">
					<Trans i18nKey="auth.signup.right.subtitle">
						Já tem conta? Então entre <Link to={AppRoutes.Login}>aqui</Link> pra fazer login!
					</Trans>
				</p>
			}
			error={error}>
			<form className="me-md-5 d-flex flex-column" onSubmit={submit}>
				<div className="form-group w-100">
					<div className="mb-3">
						<Input
							name="name"
							type="name"
							label={t('auth.signup.form.name.label')}
							placeholder={t('auth.signup.form.name.placeholder')}
							description={t('auth.signup.form.name.description')}
							autoComplete="on"
							{...name}
						/>
					</div>
					<div className="mb-3">
						<Input
							name="email"
							type="email"
							label={t('auth.signup.form.email.label')}
							placeholder={t('auth.signup.form.email.placeholder')}
							description={t('auth.signup.form.email.description')}
							autoComplete="on"
							{...email}
						/>
					</div>
					<div className="mb-3">
						<Input
							name="password"
							type="password"
							label={t('auth.signup.form.password.label')}
							placeholder={t('auth.signup.form.password.placeholder')}
							description={t('auth.signup.form.password.description')}
							className="mb-2"
							autoComplete="on"
							{...password}
						/>
					</div>
					<div className="mb-3">
						<Input
							name="password"
							type="password"
							label={t('auth.signup.form.repeatPass.label')}
							placeholder={t('auth.signup.form.repeatPass.placeholder')}
							description={t('auth.signup.form.repeatPass.description')}
							className="mb-2"
							autoComplete="on"
							{...repeatPass}
						/>
					</div>
					<div className="d-grid gap-2">
						<Button type="submit" loading={loading}>
							{t('auth.signup.form.button.label')}
						</Button>
					</div>
				</div>
			</form>
		</AuthenticationLayout>
	);
};
