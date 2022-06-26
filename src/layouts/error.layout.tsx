import { ErrorState, ErrorStateProps } from '@components/error-state';
import React from 'react';

export const ErrorLayout: React.FC<ErrorStateProps> = (props) => {
	return (
		<div className="layout error">
			<div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
				<ErrorState {...props} />
			</div>
		</div>
	);
};
