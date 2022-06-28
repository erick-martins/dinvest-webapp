import React from 'react';
import { FCProps } from '@definitions/types';
import Container from 'react-bootstrap/Container';
import { Sidebar } from '@layouts/components/sidebar';

export const DashboardLayout: React.FC<FCProps> = ({ children }) => {
	return (
		<Container className="d-flex h-100">
			<Sidebar />
			{children}
		</Container>
	);
};
