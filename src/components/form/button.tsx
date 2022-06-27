import React from 'react';
import BSButton, { ButtonProps } from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface Props extends ButtonProps {
	loading?: boolean;
}

export const Button: React.FC<Props> = ({
	loading = false,
	onClick,
	children,
	className,
	...props
}) => {
	return (
		<BSButton
			variant={loading ? 'primary' : 'outline-primary'}
			{...props}
			onClick={!loading ? onClick : undefined}
			className={`mt-2 ${className}`}>
			{loading ? (
				<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
			) : null}
			{children}
		</BSButton>
	);
};
