import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SyrusAiApi implements ICredentialType {
	name = 'syrusAiApi';
	displayName = 'Syrus AI API';
	documentationUrl = 'https://api.syrus-ai.com/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://api.syrus-ai.com/syrus-api',
			required: true,
			description: 'The base URL for the Syrus AI API',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your Syrus AI API key',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'syrus-api-key': '={{$credentials.apiKey}}',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiUrl}}',
			url: '/health',
			method: 'GET',
		},
	};
}
