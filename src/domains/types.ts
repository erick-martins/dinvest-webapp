import { ApiError } from '@app/api/errors';

export interface ThunkRejection {
	rejectValue: ApiError;
}
