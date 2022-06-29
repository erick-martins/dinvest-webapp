import React, { useContext, useEffect, useState } from 'react';
import { Logger } from '@app/utils/logger';
import { AppDispatch, FCProps } from '@definitions/types';
import { UserService } from '@services/user.service';
import { createContext } from 'react';
import {
	AuthenticateDto,
	AuthenticationContext,
	AuthState,
	CreateAccountDto,
	RestorePasswordDto
} from './types';
import { useDispatch } from 'react-redux';
import { UserActions } from '@domains/user/reducer';

const Context = createContext({} as AuthenticationContext);

export const AuthContext: React.FC<FCProps> = ({ children }) => {
	const dispatch = useDispatch<AppDispatch>();

	const [isAuthenticated, setIsAuthenticatedState] = useState<AuthState>('checking');
	const [loading, setLoadingState] = useState<boolean>(false);

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

	const restore = async (data: RestorePasswordDto) => {
		try {
			setLoadingState(true);
			const { success } = await UserService.passwordRestore(data);
			return success;
		} catch (error: unknown) {
			Logger.captureException(error);
			throw error;
		} finally {
			setLoadingState(false);
		}
	};

	const authenticate = async (data: AuthenticateDto) => {
		try {
			setLoadingState(true);
			const profile = await UserService.login(data);
			dispatch(UserActions.setProfile(profile));
			setIsAuthenticatedState('logged');
			return profile;
		} catch (error: unknown) {
			Logger.captureException(error);
			throw error;
		} finally {
			setLoadingState(false);
		}
	};

	const createAccount = async (data: CreateAccountDto) => {
		try {
			setLoadingState(true);
			const profile = await UserService.signup(data);
			dispatch(UserActions.setProfile(profile));
			setIsAuthenticatedState('logged');
			return profile;
		} catch (error: unknown) {
			Logger.captureException(error);
			throw error;
		} finally {
			setLoadingState(false);
		}
	};

	const logout = async () => {
		try {
			setLoadingState(true);
			setIsAuthenticatedState('checking');
			const { success } = await UserService.logout();
			setIsAuthenticatedState('not-logged');
			dispatch(UserActions.reset());
			return success;
		} catch (error: unknown) {
			setIsAuthenticatedState('logged');
			Logger.captureException(error);
			throw error;
		} finally {
			setLoadingState(false);
		}
	};

	return (
		<Context.Provider
			value={{ isAuthenticated, loading, authenticate, restore, createAccount, logout }}>
			{children}
		</Context.Provider>
	);
};

export const useAuthentication = () => {
	const context = useContext(Context);

	return context;
};
