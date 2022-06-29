import { extractErrorMessage } from '@app/utils/extract-error-message';
import { emailRegex, passwordRegex } from '@config/constants';
import { FormEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthentication } from './context';

interface AuthFormValidationErrors {
	name?: string;
	email?: string;
	password?: string;
	repeatPass?: string;
}

interface AuthFormValidationConfigLogin {
	scope: 'login';
	errorTexts: {
		email: {
			required: string;
		};
		password: {
			required: string;
		};
	};
}

interface AuthFormValidationConfigSignUp {
	scope: 'signup';
	errorTexts: {
		name: {
			required: string;
		};
		email: {
			required: string;
			invalid: string;
		};
		password: {
			required: string;
			invalid: string;
		};
		repeatPass: {
			required: string;
			invalid: string;
			notMatching: string;
		};
	};
}

interface AuthFormValidationConfigRecoveryPass {
	scope: 'restore';
	errorTexts: {
		email: {
			required: string;
		};
	};
}

type AuthFormValidationConfig =
	| AuthFormValidationConfigLogin
	| AuthFormValidationConfigSignUp
	| AuthFormValidationConfigRecoveryPass;

type Scopes = AuthFormValidationConfig['scope'];

interface ValidationItem {
	validate: (value: string) => boolean;
	isValid: boolean;
	error?: string;
}
interface ValidationItemRepeatPass {
	validate: (pass1: string, pass2: string) => boolean;
	isValid: boolean;
	error?: string;
}

type AuthFormValidationResult<S extends Scopes> = {
	email: ValidationItem;
} & (S extends 'login'
	? {
			password: ValidationItem;
	  }
	: { name: ValidationItem; password: ValidationItem; repeatPass: ValidationItemRepeatPass });

const useAuthFormValidation = <
	C extends AuthFormValidationConfig,
	R = AuthFormValidationResult<C['scope']>
>(
	configuration: C
): R => {
	const [errors, setErrors] = useState<AuthFormValidationErrors>({});

	const updateError = (errors: Partial<AuthFormValidationErrors>) => {
		setErrors((prevErrors) => ({ ...prevErrors, ...errors }));
	};
	const clearErrorsOf = (key: keyof AuthFormValidationErrors) => {
		setErrors((prevErrors) => {
			const next = { ...prevErrors };
			if (prevErrors[key]) {
				delete next[key];
			}
			return next;
		});
	};

	const name = useCallback(
		(email: string) => {
			clearErrorsOf('name');

			const {
				name: { required }
			} = configuration.errorTexts as AuthFormValidationConfigSignUp['errorTexts'];
			if (!email) {
				updateError({ name: required });
				return false;
			}

			return true;
		},
		[configuration, updateError, clearErrorsOf]
	);

	const email = useCallback(
		(email: string) => {
			clearErrorsOf('email');

			const {
				email: { required, invalid }
			} = configuration.errorTexts as AuthFormValidationConfigSignUp['errorTexts'];
			if (!email) {
				updateError({ email: required });
				return false;
			}

			// Login only verifies required
			if (configuration.scope === 'login') return true;

			if (!emailRegex.test(email)) {
				updateError({ email: invalid });
				return false;
			}

			return true;
		},
		[configuration, updateError, clearErrorsOf]
	);

	const password = useCallback(
		(password: string) => {
			clearErrorsOf('password');

			const {
				password: { required, invalid }
			} = configuration.errorTexts as AuthFormValidationConfigSignUp['errorTexts'];
			if (!password) {
				updateError({ password: required });
				return false;
			}

			// Login only verifies required
			if (configuration.scope === 'login') return true;

			if (!passwordRegex.test(password)) {
				updateError({ password: invalid });
				return false;
			}

			return true;
		},
		[configuration, updateError, clearErrorsOf]
	);

	const repeatPass = useCallback(
		(pass1: string, pass2: string) => {
			clearErrorsOf('repeatPass');

			const {
				repeatPass: { required, invalid, notMatching }
			} = configuration.errorTexts as AuthFormValidationConfigSignUp['errorTexts'];

			if (!pass2) {
				updateError({ repeatPass: required });
				return false;
			}

			if (!passwordRegex.test(pass2)) {
				updateError({ repeatPass: invalid });
				return false;
			}

			if (pass1 !== pass2) {
				updateError({ repeatPass: notMatching });
				return false;
			}
			return true;
		},
		[configuration, updateError, clearErrorsOf]
	);

	const emailPack = {
		validate: email,
		isValid: !errors.email,
		error: errors.email
	};

	const passwordPack = {
		validate: password,
		isValid: !errors.password,
		error: errors.password
	};

	const repeatPassPack = {
		validate: repeatPass,
		isValid: !errors.repeatPass,
		error: errors.repeatPass
	};

	const namePack = {
		validate: name,
		isValid: !errors.name,
		error: errors.name
	};

	if (configuration.scope === 'login') {
		return {
			email: emailPack,
			password: passwordPack
		} as unknown as R;
	} else if (configuration.scope === 'signup') {
		return {
			name: namePack,
			email: emailPack,
			password: passwordPack,
			repeatPass: repeatPassPack
		} as unknown as R;
	}

	return {
		email: emailPack
	} as unknown as R;
};

export const useLoginFormValidation = () => {
	const auth = useAuthentication();
	const [loading, setLoadingState] = useState(false);
	const [loggedIn, setLoggedInState] = useState(false);
	const [error, setError] = useState('');

	const { t } = useTranslation();

	const configuration: AuthFormValidationConfig = useMemo(() => {
		return {
			scope: 'login',
			errorTexts: {
				email: {
					required: t('auth.login.form.email.errors.required')
				},
				password: {
					required: t('auth.login.form.password.errors.required')
				}
			}
		};
	}, []);

	const validation = useAuthFormValidation(configuration);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const validateAll = () => {
		return [validation.email.validate(email), validation.password.validate(password)].every(
			Boolean
		);
	};

	const submit = async (event?: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		event?.stopPropagation();

		setError('');
		if (!validateAll()) return;
		setLoadingState(true);
		try {
			await auth.authenticate({ email, password });
			setLoggedInState(true);
		} catch (error: unknown) {
			const message = extractErrorMessage(error);
			setError(message);
		} finally {
			setLoadingState(false);
		}
	};

	const onEmailChange = (event: FormEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
		if (validation.email.error) {
			validation.email.validate(event.currentTarget.value);
		}
	};
	const onPasswordChange = (event: FormEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
		if (validation.password.error) {
			validation.password.validate(event.currentTarget.value);
		}
	};
	const onEmailBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
		validation.email.validate(event.currentTarget.value);
	};
	const onPasswordBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
		validation.password.validate(event.currentTarget.value);
	};

	return {
		email: {
			value: email,
			onChange: onEmailChange,
			disabled: loading,
			error: validation.email.error,
			onBlur: onEmailBlur
		},
		password: {
			value: password,
			onChange: onPasswordChange,
			disabled: loading,
			error: validation.password.error,
			onBlur: onPasswordBlur
		},
		error: error,
		loggedIn: loggedIn,
		loading: loading,
		submit: submit
	};
};

export const useSignUpFormValidation = () => {
	const auth = useAuthentication();
	const [loading, setLoadingState] = useState(false);
	const [accountCreated, setAccountCreatedState] = useState(false);
	const [error, setError] = useState('');

	const { t } = useTranslation();

	const configuration: AuthFormValidationConfig = useMemo(() => {
		return {
			scope: 'signup',
			errorTexts: {
				name: {
					required: t('auth.signup.form.name.errors.required')
				},
				email: {
					required: t('auth.signup.form.email.errors.required'),
					invalid: t('auth.signup.form.email.errors.invalid')
				},
				password: {
					required: t('auth.signup.form.password.errors.required'),
					invalid: t('auth.signup.form.password.errors.invalid')
				},
				repeatPass: {
					required: t('auth.signup.form.repeatPass.errors.required'),
					invalid: t('auth.signup.form.repeatPass.errors.invalid'),
					notMatching: t('auth.signup.form.repeatPass.errors.notMatching')
				}
			}
		};
	}, []);

	const validation = useAuthFormValidation(configuration);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPass, setRepeatPass] = useState('');

	const validateAll = () => {
		return [
			validation.name.validate(name),
			validation.email.validate(email),
			validation.password.validate(password),
			validation.repeatPass.validate(password, repeatPass)
		].every(Boolean);
	};

	const submit = async (event?: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		event?.stopPropagation();

		setError('');
		if (!validateAll()) return;
		setLoadingState(true);
		try {
			await auth.createAccount({ name, email, password });
			setAccountCreatedState(true);
		} catch (error: unknown) {
			const message = extractErrorMessage(error);
			setError(message);
		} finally {
			setLoadingState(false);
		}
	};

	const onNameChange = (event: FormEvent<HTMLInputElement>) => {
		setName(event.currentTarget.value);
		if (validation.name.error) {
			validation.name.validate(event.currentTarget.value);
		}
	};

	const onEmailChange = (event: FormEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
		if (validation.email.error) {
			validation.email.validate(event.currentTarget.value);
		}
	};
	const onPasswordChange = (event: FormEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
		if (validation.password.error) {
			validation.password.validate(event.currentTarget.value);
			if (repeatPass) {
				validation.repeatPass.validate(event.currentTarget.value, repeatPass);
			}
		}
	};
	const onRepeatPassChange = (event: FormEvent<HTMLInputElement>) => {
		setRepeatPass(event.currentTarget.value);
		if (validation.repeatPass.error) {
			validation.repeatPass.validate(password, event.currentTarget.value);
		}
	};
	const onNameBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
		validation.name.validate(event.currentTarget.value);
	};
	const onEmailBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
		validation.email.validate(event.currentTarget.value);
	};
	const onPasswordBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
		validation.password.validate(event.currentTarget.value);
		if (repeatPass) {
			validation.repeatPass.validate(event.currentTarget.value, repeatPass);
		}
	};
	const onRepeatPassBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
		validation.repeatPass.validate(password, event.currentTarget.value);
	};

	return {
		name: {
			value: name,
			onChange: onNameChange,
			disabled: loading,
			error: validation.name.error,
			onBlur: onNameBlur
		},
		email: {
			value: email,
			onChange: onEmailChange,
			disabled: loading,
			error: validation.email.error,
			onBlur: onEmailBlur
		},
		password: {
			value: password,
			onChange: onPasswordChange,
			disabled: loading,
			error: validation.password.error,
			onBlur: onPasswordBlur
		},
		repeatPass: {
			value: repeatPass,
			onChange: onRepeatPassChange,
			disabled: loading,
			error: validation.repeatPass.error,
			onBlur: onRepeatPassBlur
		},
		error: error,
		accountCreated: accountCreated,
		loading: loading,
		submit: submit
	};
};

export const useRestoreFormValidation = () => {
	const auth = useAuthentication();
	const [loading, setLoadingState] = useState(false);
	const [error, setError] = useState('');

	const { t } = useTranslation();

	const configuration: AuthFormValidationConfig = useMemo(() => {
		return {
			scope: 'restore',
			errorTexts: {
				email: {
					required: t('auth.login.form.email.errors.required'),
					invalid: t('auth.signup.form.email.errors.invalid')
				}
			}
		};
	}, []);

	const validation = useAuthFormValidation(configuration);
	const [email, setEmail] = useState('');

	const submit = async (event?: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		event?.stopPropagation();

		setError('');
		if (!validation.email.validate(email)) return;
		setLoadingState(true);
		try {
			return await auth.restore({ email });
		} catch (error: unknown) {
			const message = extractErrorMessage(error);
			setError(message);
		} finally {
			setLoadingState(false);
		}
	};

	const onEmailChange = (event: FormEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
		if (validation.email.error) {
			validation.email.validate(event.currentTarget.value);
		}
	};
	const onEmailBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
		validation.email.validate(event.currentTarget.value);
	};

	return {
		email: {
			value: email,
			onChange: onEmailChange,
			disabled: loading,
			error: validation.email.error,
			onBlur: onEmailBlur
		},
		error: error,
		loading: loading,
		submit: submit
	};
};
