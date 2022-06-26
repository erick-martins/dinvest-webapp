import { AxiosError } from 'axios';

interface ResponseErrorData {
	code: string;
	message: string;
}

export class ApiError extends Error {
	code?: string;
	status?: number;

	constructor(error: AxiosError) {
		super(error.message);
		if (error.response) {
			try {
				const data: ResponseErrorData = JSON.parse(error.response.data as string);
				this.code = data.code;
				this.message = data.message;
			} catch (err) {
				this.message = `${error.response.data}`;
				this.code = 'UNKNOWN';
			}
			this.status = error.response.status;
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
		} else {
			this.code = error.code;
		}
	}
}
