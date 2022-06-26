import { Environment } from '@config/environment';
import axios, { AxiosError } from 'axios';
import { ApiError } from './errors';

export type SuccessApiResponse<T = undefined, D = boolean> = D extends false
	? { success: false }
	: T extends undefined
	? {
			success: true;
	  }
	: {
			success: true;
			data: T;
	  };

const service = axios.create({
	headers: {
		'Access-Control-Allow-Origin': '*'
	},
	baseURL: Environment.servicesBaseURL
});

// Intercept errors
service.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error: AxiosError) {
		return Promise.reject(new ApiError(error));
	}
);

export const ApiService = service;
