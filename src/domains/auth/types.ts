import { UserProfile } from '@domains/user/types';

export type AuthState = 'checking' | 'logged' | 'not-logged';

export interface AuthenticationContext {
	isAuthenticated: AuthState;
	authenticate: (data: AuthenticateDto) => Promise<UserProfile>;
	createAccount: (data: CreateAccountDto) => Promise<UserProfile>;
	logout: () => Promise<boolean>;
}
export interface AuthenticateDto {
	email: string;
	password: string;
}

export interface CreateAccountDto extends AuthenticateDto {
	name: string;
}
