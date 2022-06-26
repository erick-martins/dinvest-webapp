export const Environment = {
	mockedBehavior: process.env.MOCKED ?? true,
	servicesBaseURL: process.env.API_URL ?? 'https://api.someurl.com'
};
