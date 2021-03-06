import React, { useEffect, useMemo } from 'react';
import { Input } from '@components/form/input';
import { useLoginFormValidation } from '@domains/auth/form-validation.hook';
import { AuthenticationLayout } from '@layouts/authentication.layout';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/form/button';
import { AppRoutes } from '@app/routes';
import { useBreakpoint } from '@app/utils/hooks/use-breakpoints.hook';
import { ButtonVariant } from 'react-bootstrap/esm/types';
import { useDocumentTitle } from '@app/utils/hooks/use-document-title';

export const LoginScreen: React.FC = () => {
	useDocumentTitle('login');

	const { t } = useTranslation();
	const { email, password, submit, loading, loggedIn, error } = useLoginFormValidation();
	const navigate = useNavigate();
	const breakpoint = useBreakpoint();

	const buttonVariant: ButtonVariant = useMemo(() => {
		const smallOrLess = ['xs', 'sm'].includes(breakpoint);
		if (smallOrLess) return 'primary-inverse';
		return loading ? 'primary' : 'outline-primary';
	}, [loading, breakpoint]);

	useEffect(() => {
		if (loggedIn) {
			navigate(AppRoutes.Dashboard);
		}
	}, [loggedIn]);

	return (
		<AuthenticationLayout
			title={t('auth.login.left.title')}
			subtitle={t('auth.login.left.subtitle')}
			rightTitle={t('auth.login.right.title')}
			rightSubtitle={
				<p className="text-primary-700">
					<Trans i18nKey="auth.login.right.subtitle">
						Ainda não tem conta? Então entre <Link to={AppRoutes.SignUp}>aqui</Link> e crie a sua
						conta!
					</Trans>
				</p>
			}
			error={error}>
			<form className="me-md-5 d-flex flex-column" onSubmit={submit}>
				<div className="form-group w-100">
					<div className="mb-3">
						<Input
							name="email"
							type="email"
							label={t('auth.login.form.email.label')}
							placeholder={t('auth.login.form.email.placeholder')}
							description={t('auth.login.form.email.description')}
							autoComplete="on"
							{...email}
						/>
					</div>
					<div className="mb-3">
						<Input
							name="password"
							type="password"
							label={t('auth.login.form.password.label')}
							placeholder={t('auth.login.form.password.placeholder')}
							description={t('auth.login.form.password.description')}
							className="mb-2"
							autoComplete="on"
							{...password}
						/>
					</div>
					<div className="mb-3">
						<Link to={AppRoutes.RestorePassword}>{t('auth.login.form.recovery.label')}</Link>
					</div>
					<div className="d-grid gap-2">
						<Button type="submit" loading={loading} variant={buttonVariant}>
							{t('auth.login.form.button.label')}
						</Button>
					</div>
				</div>
			</form>
		</AuthenticationLayout>
	);
};
