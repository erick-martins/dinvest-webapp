import { fakeRequest } from '@app/utils/fake-request';
import { mockerSuccessResponse } from '@app/__mocks__/success-response.mock';
import { MockedUserProfile } from '@app/__mocks__/user.mock';
import { Environment } from '@config/environment';
import { AuthenticateDto, CreateAccountDto, RestorePasswordDto } from '@domains/auth/types';
import { UserProfile } from '@domains/user/types';
import { ApiService, SuccessApiResponse } from '../api.service';

export class UserService {
	static async login(data: AuthenticateDto) {
		if (Environment.mockedBehavior) {
			const user = { ...MockedUserProfile, email: data.email };
			window.localStorage.setItem('user', JSON.stringify(user));

			return await fakeRequest(user as UserProfile);
		}
		const response = await ApiService.post<UserProfile>('user/login', data);
		return response.data;
	}

	static async logout() {
		if (Environment.mockedBehavior) {
			window.localStorage.removeItem('user');
			return await fakeRequest(mockerSuccessResponse);
		}
		const response = await ApiService.post<SuccessApiResponse>('user/logout');
		return response.data;
	}

	static async signup(data: CreateAccountDto) {
		if (Environment.mockedBehavior) {
			const user = { ...MockedUserProfile, email: data.email, name: data.name };
			window.localStorage.setItem('user', JSON.stringify(user));
			return await fakeRequest(user as UserProfile);
		}
		const response = await ApiService.post<UserProfile>('user/signup', data);
		return response.data;
	}

	static async passwordRestore(data: RestorePasswordDto) {
		if (Environment.mockedBehavior) return await fakeRequest(mockerSuccessResponse);
		const response = await ApiService.post<SuccessApiResponse>('user/restore', data);
		return response.data;
	}

	static async profile() {
		if (Environment.mockedBehavior) {
			const userStorage = window.localStorage.getItem('user');
			const user = JSON.parse(userStorage ?? '{}');
			return await fakeRequest(user as UserProfile);
		}
		const response = await ApiService.post<UserProfile>('user/profile');
		return response.data;
	}

	static async isLoggedIn(): Promise<SuccessApiResponse<UserProfile>> {
		// TODO: create check is logged in
		if (Environment.mockedBehavior) {
			const userStorage = window.localStorage.getItem('user');
			const user = JSON.parse(userStorage ?? '{}');
			return userStorage !== null ? { success: true, data: user } : { success: false };
		}
		const response = await ApiService.post<SuccessApiResponse<UserProfile>>('user/verify');
		return response.data;
	}
}
