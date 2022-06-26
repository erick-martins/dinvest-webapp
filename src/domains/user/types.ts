import { ApiError } from '@app/api/errors';

export interface UsersState {
	profile?: UserProfile;
	error?: ApiError;
	loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface UserProfile {
	id: number;
	name: string;
	email: string;
}
