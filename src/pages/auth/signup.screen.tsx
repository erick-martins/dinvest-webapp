import React, { useEffect, useMemo } from 'react';
import { Input } from '@components/form/input';
import { useSignUpFormValidation } from '@domains/auth/form-validation.hook';
import { AuthenticationLayout } from '@layouts/authentication.layout';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/form/button';
import { AppRoutes } from '@app/routes';
import { useBreakpoint } from '@app/utils/hooks/use-breakpoints.hook';
import { ButtonVariant } from 'react-bootstrap/esm/types';
import { useDocumentTitle } from '@app/utils/hooks/use-document-title';

export const SignUpScreen: React.FC = () => {
	useDocumentTitle('signup');

	const { t } = useTranslation();
	const { email, password, repeatPass, name, submit, loading, accountCreated, error } =
		useSignUpFormValidation();
	const navigate = useNavigate();
	const breakpoint = useBreakpoint();

	const buttonVariant: ButtonVariant = useMemo(() => {
		const smallOrLess = ['xs', 'sm'].includes(breakpoint);
		if (smallOrLess) return 'primary-inverse';
		return loading ? 'primary' : 'outline-primary';
	}, [loading, breakpoint]);

	useEffect(() => {
		if (accountCreated) {
			navigate(AppRoutes.Dashboard);
		}
	}, [accountCreated]);

	return (
		<AuthenticationLayout
			title={t('auth.signup.left.title')}
			subtitle={t('auth.signup.left.subtitle')}
			rightTitle={t('auth.signup.right.title')}
			rightSubtitle={
				<p className="text-primary-700">
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
						<Button type="submit" loading={loading} variant={buttonVariant}>
							{t('auth.signup.form.button.label')}
						</Button>
					</div>
				</div>
			</form>
		</AuthenticationLayout>
	);
};
