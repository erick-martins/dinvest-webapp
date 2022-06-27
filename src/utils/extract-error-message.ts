import { ApiError } from '@app/api/errors';
import { i18n } from '@i18n/i18n';

export const extractErrorMessage = (error: unknown, unknownMessage?: string) => {
	const message = unknownMessage ?? i18n.t('errors.unknown') ?? '';
	if (!error) return message;
	if (typeof error === 'string') return error;
	if (typeof error === 'object') {
		if (error instanceof ApiError) return error.message;
		if ('message' in error) return (error as { message: string }).message;
	}
	return message;
};
