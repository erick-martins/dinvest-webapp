interface Props extends React.HTMLProps<HTMLInputElement> {
	label: string;
	description?: string;
	error?: string;
}

export const Input: React.FC<Props> = ({ label, id, className, error, description, ...props }) => {
	const renderDescription = () => {
		if (error) {
			return <small className="form-text text-danger">{error}</small>;
		}
		if (description) {
			return <small className="form-text invalid-feedback">{description}</small>;
		}
		return null;
	};
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
				{...props}
			/>
			{renderDescription()}
		</>
	);
};
