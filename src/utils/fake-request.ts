export const fakeRequest = async <T>(data: T, ms = 700): Promise<T> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(data), ms);
	});
};
