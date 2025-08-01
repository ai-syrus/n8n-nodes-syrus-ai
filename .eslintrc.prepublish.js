module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
		extraFileExtensions: ['.json'],
	},
	plugins: ['@typescript-eslint', 'n8n-nodes-base'],
	extends: [
		'eslint:recommended',
		'@typescript-eslint/recommended',
		'plugin:n8n-nodes-base/community',
	],
	rules: {
		'n8n-nodes-base/community-package-json-name-still-default': 'error',
		'n8n-nodes-base/community-package-json-author-missing': 'error',
		'n8n-nodes-base/community-package-json-author-name-missing': 'error',
		'n8n-nodes-base/community-package-json-author-email-missing': 'error',
		'n8n-nodes-base/community-package-json-repository-url-still-default': 'error',
		'n8n-nodes-base/community-package-json-n8n-nodes-empty': 'error',
		'n8n-nodes-base/community-package-json-n8n-credentials-empty': 'error',
	},
};

