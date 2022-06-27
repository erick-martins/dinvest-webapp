module.exports = {
	'*.{js,jsx,ts,tsx}': [
		'yarn eslint "**/*.{js,jsx,ts,tsx}" --max-warnings=0 --fix',
		'yarn react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests',
		() => 'yarn tsc-files --noEmit'
	],
	'*.{js,jsx,ts,tsx,json,css,js}': ['prettier --write']
};
