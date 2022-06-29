import React, { useMemo } from 'react';
import { Input } from '@components/form/input';
import { useRestoreFormValidation } from '@domains/auth/form-validation.hook';
import { AuthenticationLayout } from '@layouts/authentication.layout';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/form/button';
import { AppRoutes } from '@app/routes';
import { useBreakpoint } from '@app/utils/hooks/use-breakpoints.hook';
import { ButtonVariant } from 'react-bootstrap/esm/types';
import { useDocumentTitle } from '@app/utils/hooks/use-document-title';

export const RestorePassScreen: React.FC = () => {
	useDocumentTitle('restore');

	const { t } = useTranslation();
	const { email, submit, loading, error } = useRestoreFormValidation();
	const breakpoint = useBreakpoint();
	const navigate = useNavigate();

	const buttonVariant: ButtonVariant = useMemo(() => {
		const smallOrLess = ['xs', 'sm'].includes(breakpoint);
		if (smallOrLess) return 'primary-inverse';
		return loading ? 'primary' : 'outline-primary';
	}, [loading, breakpoint]);

	const submitHandler = async (event?: React.FormEvent<HTMLFormElement>) => {
		const result = await submit(event);
		if (result) {
			navigate(AppRoutes.Login, { replace: true });
		}
	};

	return (
		<AuthenticationLayout
			title={t('auth.restore.left.title')}
			subtitle={t('auth.restore.left.subtitle')}
			rightTitle={t('auth.restore.right.title')}
			rightSubtitle={
				<p className="text-primary-700">
					<Trans i18nKey="auth.restore.right.subtitle">
						Ainda não tem conta? Então entre <Link to={AppRoutes.SignUp}>aqui</Link> e crie a sua
						conta!
					</Trans>
				</p>
			}
			error={error}>
			<form className="me-md-5 d-flex flex-column" onSubmit={submitHandler}>
				<div className="form-group w-100">
					<div className="mb-3">
						<Input
							name="email"
							type="email"
							label={t('auth.restore.form.email.label')}
							placeholder={t('auth.restore.form.email.placeholder')}
							description={t('auth.restore.form.email.description')}
							autoComplete="on"
							{...email}
						/>
					</div>
					<div className="d-grid gap-2">
						<Button type="submit" loading={loading} variant={buttonVariant}>
							{t('auth.restore.form.button.label')}
						</Button>
					</div>
				</div>
			</form>
		</AuthenticationLayout>
	);
};
