import { useDocumentTitle } from '@app/utils/hooks/use-document-title';
import { DashboardLayout } from '@layouts/dashboard.layout';
import React from 'react';

export const InsightsScreen: React.FC = () => {
	useDocumentTitle('insights');
	return (
		<DashboardLayout>
			<main>
				<h2>Welcome to the insights!</h2>
				<p>TODO</p>
			</main>
		</DashboardLayout>
	);
};
