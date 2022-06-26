// import * as Sentry from "@sentry/react";

import moment from 'moment';

export class Logger {
	private static getTime() {
		return moment().format('YYYY/MM/DD h:mm:ss a');
	}

	static captureException(...arg: unknown[]) {
		console.log(`[Error - ${Logger.getTime()}]`, ...arg);
		// Sentry.captureException(ex)
	}

	static info(...arg: unknown[]) {
		console.log(`[Info - ${Logger.getTime()}]`, ...arg);
	}
	static warning(...arg: unknown[]) {
		console.log(`[Warning - ${Logger.getTime()}]`, ...arg);
	}
}
