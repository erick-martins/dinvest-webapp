import { useDocumentTitle } from '@app/utils/hooks/use-document-title';
import { DashboardLayout } from '@layouts/dashboard.layout';
import React from 'react';

export const ProfileScreen: React.FC = () => {
	useDocumentTitle('profile');
	return (
		<DashboardLayout>
			<main>
				<h2>Welcome to the profile!</h2>
				<p>TODO</p>
			</main>
		</DashboardLayout>
	);
};
