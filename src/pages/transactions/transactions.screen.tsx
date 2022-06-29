import { useDocumentTitle } from '@app/utils/hooks/use-document-title';
import { DashboardLayout } from '@layouts/dashboard.layout';
import React from 'react';

export const TransactionsScreen: React.FC = () => {
	useDocumentTitle('transactions');
	return (
		<DashboardLayout>
			<main>
				<h2>Welcome to the Transactions!</h2>
				<p>TODO</p>
			</main>
		</DashboardLayout>
	);
};
