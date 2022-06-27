import React from 'react';

interface Props extends React.HTMLProps<HTMLInputElement> {
	label: string;
	description?: string;
	error?: string;
}

export const Input: React.FC<Props> = ({ label, id, className, error, description, ...props }) => {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
				{...props}
			/>
			<small className="form-text invalid-feedback">{error}</small>
			<small className="form-text text-muted">{description}</small>
		</>
	);
};
