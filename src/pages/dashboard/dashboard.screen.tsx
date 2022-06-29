import { useDocumentTitle } from '@app/utils/hooks/use-document-title';
import BarHorizontalStacked from '@app/__mocks__/charts-mock/BarHorizontalStacked';
import CustomStyles from '@app/__mocks__/charts-mock/CustomStyles';
import { Card } from '@components/card';
import { DashboardLayout } from '@layouts/dashboard.layout';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

export const DashboardScreen: React.FC = () => {
	useDocumentTitle('home');
	const { t } = useTranslation();

	return (
		<DashboardLayout>
			<div className="w-100 bg-dark box-shadow p-1 text-white px-3 pt-2">
				<h4 className="text-white">
					<Trans t={t} i18nKey="dashboard.home.balance">
						Balanço: <span className="text-success">R$ 2472,20</span>
					</Trans>
				</h4>
			</div>
			<div className="p-4">
				<Card className="dashboard__card">
					<div className="p-2 w-100 bg-light rounded-top">
						<h3 className="text-dark">{t('dashboard.home.charts.expenses.title')}</h3>
					</div>
					<div className="card-body p-0">
						<BarHorizontalStacked />
					</div>
				</Card>
			</div>
			<div className="p-4">
				<Card className="dashboard__card">
					<div className="p-2 w-100 bg-light rounded-top">
						<h3 className="text-dark">{t('dashboard.home.charts.monthly.title')}</h3>
					</div>
					<div className="card-body p-0">
						<CustomStyles />
					</div>
				</Card>
			</div>
		</DashboardLayout>
	);
};
