import React, { ReactNode, useEffect, useState } from 'react';
import { FCProps } from '@definitions/types';
import LogoWhite from '@assets/images/logo-white.png';
import '@styles/auth-layout.style.scss';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

interface Props extends FCProps {
	title: string;
	subtitle: string | ReactNode;
	rightTitle: string;
	rightSubtitle: string | ReactNode;
	error?: string;
}

export const AuthenticationLayout: React.FC<Props> = ({
	title,
	subtitle,
	rightSubtitle,
	rightTitle,
	children,
	error
}) => {
	const [errorMessage, setErrorMessage] = useState<string>();

	const closeError = () => {
		setErrorMessage(undefined);
	};

	useEffect(() => {
		if (error && error !== '') {
			setErrorMessage(error);
		}
	}, [error]);

	const renderError = () =>
		errorMessage ? (
			<Alert variant="danger" onClose={closeError} dismissible>
				{errorMessage}
			</Alert>
		) : null;

	const renderSubtitle = (subtitle?: string | ReactNode) => {
		if (!subtitle) return null;
		if (typeof subtitle === 'string') {
			return <p className="text-primary-700">{subtitle}</p>;
		}
		return <>{subtitle}</>;
	};

	return (
		<Row className="row h-100 auth-layout auth__layout">
			<Col
				md={6}
				sm={12}
				className="d-flex h-100 flex-column align-items-center align-items-md-end justify-content-center bg-md-white">
				<Image src={LogoWhite} alt="logo" className="mb-5 d-md-none" />
				<div className="left-container">
					{renderError()}
					<h3 className="text-primary-700">{title}</h3>
					{renderSubtitle(subtitle)}
					{children}
				</div>
			</Col>
			<Col
				md={6}
				sm={12}
				className="d-md-flex h-100 flex-column align-items-start justify-content-center d-none ps-5 text-center ">
				<div className="right-container">
					<Image src={LogoWhite} alt="logo" className="mb-5" />
					<h3 className="text-primary-700">{rightTitle}</h3>
					{renderSubtitle(rightSubtitle)}
				</div>
			</Col>
		</Row>
	);
};
