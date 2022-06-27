import React from 'react';
import { FCProps } from '@definitions/types';
import LogoWhite from '@assets/images/logo-white.png';
import '@styles/auth-layout.style.scss';

interface Props extends FCProps {
	title: string;
	subtitle: string;
	rightTitle: string;
	rightSubtitle: string;
}

export const AuthenticationLayout: React.FC<Props> = ({
	title,
	subtitle,
	rightSubtitle,
	rightTitle,
	children
}) => {
	return (
		<div className="row h-100 auth-layout">
			<div className="col-md-6 col-sm-12 d-flex flex-column align-items-md-end align-items-sm-center justify-content-center bg-white">
				<div className="left-container">
					<h3 className="text-dark-off-1">{title}</h3>
					{subtitle ? <p className="text-dark-off-1">{subtitle}</p> : null}
					{children}
				</div>
			</div>
			<div className="col-md-6 col-sm-12 d-md-flex flex-column align-items-start justify-content-center d-none ps-5 text-center ">
				<div className="right-container">
					<img src={LogoWhite} alt="logo" className="mb-5" />
					<h3 className="text-dark-off-1">{rightTitle}</h3>
					{rightSubtitle ? <p className="text-dark-off-1">{rightSubtitle}</p> : null}
				</div>
			</div>
		</div>
	);
};
