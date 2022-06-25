module.exports = {
	env: {
		node: true,
		browser: true,
		es2021: true,
		jest: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'prettier',
		'plugin:react/jsx-runtime'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'react/react-in-jsx-scope': 'off'
	},
	settings: {
		react: {
			createClass: 'createReactClass',
			pragma: 'React',
			fragment: 'Fragment',
			version: 'detect',
			flowVersion: '0.53'
		},
		propWrapperFunctions: [
			'forbidExtraProps',
			{ property: 'freeze', object: 'Object' },
			{ property: 'myFavoriteWrapper' },
			{ property: 'forbidExtraProps', exact: true }
		],
		componentWrapperFunctions: [
			'observer',
			{ property: 'styled' },
			{ property: 'observer', object: 'Mobx' },
			{ property: 'observer', object: '<pragma>' }
		],
		formComponents: ['CustomForm', { name: 'Form', formAttribute: 'endpoint' }],
		linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'to' }]
	}
};
