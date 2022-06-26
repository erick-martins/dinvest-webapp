import React from 'react';
import { useTranslation } from 'react-i18next';

export interface ErrorStateProps {
	message: string;
	retry: () => void;
	retryText?: string;
	className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, retry, retryText, className }) => {
	const { t } = useTranslation();

	return (
		<div
			className={`d-flex flex-column justify-content-center align-items-center ${className} error-state`}>
			<h3>{t('error.genericTitle')}</h3>
			<p>{message}</p>
			<a className="btn btn-primary" onClick={retry}>
				{retryText ?? t('error.retry')}
			</a>
		</div>
	);
};
