/* eslint-disable @typescript-eslint/no-var-requires */
const path = require(`path`);

module.exports = {
	webpack: {
		alias: {
			'@config': path.resolve(__dirname, './src/config'),
			'@definitions': path.resolve(__dirname, './src/definitions'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@domains': path.resolve(__dirname, './src/domains'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@layouts': path.resolve(__dirname, './src/layouts'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@i18n': path.resolve(__dirname, './src/i18n'),
			'@services': path.resolve(__dirname, './src/api/services'),
			'@app': path.resolve(__dirname, './src'),
			'@mocks': path.resolve(__dirname, './__mocks__')
		}
	}
};
