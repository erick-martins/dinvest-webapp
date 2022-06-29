import { AppRoutes } from '@app/routes';
import { useClassNames } from '@app/utils/hooks/class-names';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthentication } from '../domains/auth/context';
import FullLoading from '@assets/svgs/full-loading.svg';
import { useTranslation } from 'react-i18next';

interface Props {
	redirectTo?: AppRoutes;
	screen: React.ComponentType;
}

export const PrivateRoute: React.FC<Props> = ({ redirectTo = AppRoutes.Login, screen: Screen }) => {
	const { isAuthenticated } = useAuthentication();
	const { t } = useTranslation();

	const loadingClasses = useClassNames('overlay d-flex justify-content-center align-items-center', [
		'visible',
		isAuthenticated === 'checking'
	]);

	const renderContent = () => {
		if (isAuthenticated === 'not-logged') {
			return <Navigate to={redirectTo} replace />;
		}
		if (isAuthenticated === 'logged') {
			return <Screen />;
		}
		return null;
	};

	return (
		<>
			<div className={loadingClasses} style={{ backgroundImage: `url(${FullLoading})` }}>
				<p className="loading-text">{t('loading')}</p>
			</div>
			{renderContent()}
		</>
	);
};
