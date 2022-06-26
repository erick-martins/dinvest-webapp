import React, { useContext, useEffect, useState } from 'react';
import { Logger } from '@app/utils/logger';
import { AppDispatch, FCProps } from '@definitions/types';
import { UserService } from '@services/user.service';
import { createContext } from 'react';
import { AuthenticateDto, AuthenticationContext, AuthState, CreateAccountDto } from './types';
import { useDispatch } from 'react-redux';
import { UserActions } from '@domains/user/reducer';

const Context = createContext({} as AuthenticationContext);

export const AuthContext: React.FC<FCProps> = ({ children }) => {
	const dispatch = useDispatch<AppDispatch>();

	const [isAuthenticated, setIsAuthenticatedState] = useState<AuthState>('checking');

	const checkLoggedIn = async () => {
		try {
			const response = await UserService.isLoggedIn();
			if (!response.success) {
				setIsAuthenticatedState('not-logged');
			} else {
				dispatch(UserActions.setProfile(response.data));
				setIsAuthenticatedState('logged');
			}
			return response;
		} catch (error: unknown) {
			setIsAuthenticatedState('not-logged');
		}
	};

	useEffect(() => {
		checkLoggedIn();
	}, []);

	const authenticate = async (data: AuthenticateDto) => {
		try {
			const profile = await UserService.login(data);
			dispatch(UserActions.setProfile(profile));
			setIsAuthenticatedState('logged');
			return profile;
		} catch (error: unknown) {
			Logger.captureException(error);
			throw error;
		}
	};

	const createAccount = async (data: CreateAccountDto) => {
		try {
			const profile = await UserService.signup(data);
			dispatch(UserActions.setProfile(profile));
			setIsAuthenticatedState('logged');
			return profile;
		} catch (error: unknown) {
			Logger.captureException(error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			const { success } = await UserService.logout();
			setIsAuthenticatedState('not-logged');
			dispatch(UserActions.reset());
			return success;
		} catch (error: unknown) {
			Logger.captureException(error);
			throw error;
		}
	};

	return (
		<Context.Provider value={{ isAuthenticated, authenticate, createAccount, logout }}>
			{children}
		</Context.Provider>
	);
};

export const useAuthentication = () => {
	const context = useContext(Context);

	return context;
};
