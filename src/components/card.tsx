import { FCProps } from '@definitions/types';
import React from 'react';

interface Props extends FCProps {
	className?: string;
}

export const Card: React.FC<Props> = ({ children, className }) => {
	return (
		<div className={className}>
			<div className="card mb-4 box-shadow">
				<div className="card-body p-0">{children}</div>
			</div>
		</div>
	);
};
