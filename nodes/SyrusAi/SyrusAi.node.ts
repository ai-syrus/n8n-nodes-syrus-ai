import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';

export class SyrusAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Syrus AI',
		name: 'syrusAi',
		icon: 'file:syrusai.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Syrus AI - Gemini-based AI chat model',
		defaults: {
			name: 'Syrus AI',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'syrusAiApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.apiUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'syrus-api-key': '={{$credentials.apiKey}}',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
					},
				],
				default: 'chat',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chat'],
					},
				},
				options: [
					{
						name: 'Generate Content',
						value: 'generateContent',
						description: 'Generate content using Syrus AI',
						action: 'Generate content',
					},
				],
				default: 'generateContent',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['generateContent'],
					},
				},
				default: '',
				placeholder: 'Enter your message here...',
				description: 'The message to send to Syrus AI',
			},
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['generateContent'],
					},
				},
				options: [
					{
						displayName: 'Maximum Number of Tokens',
						name: 'maxOutputTokens',
						type: 'number',
						default: 2000,
						description: 'The maximum number of tokens to generate',
						typeOptions: {
							minValue: 1,
							maxValue: 8192,
						},
					},
					{
						displayName: 'Sampling Temperature',
						name: 'temperature',
						type: 'number',
						default: 0.7,
						description:
							'Controls randomness in the output. Higher values make output more random.',
						typeOptions: {
							minValue: 0,
							maxValue: 2,
							numberPrecision: 2,
						},
					},
					{
						displayName: 'Top K',
						name: 'topK',
						type: 'number',
						default: 40,
						description:
							'Limits the number of highest probability vocabulary tokens to keep for top-k-filtering',
						typeOptions: {
							minValue: 1,
							maxValue: 100,
						},
					},
					{
						displayName: 'Top P',
						name: 'topP',
						type: 'number',
						default: 0.95,
						description:
							'Nucleus sampling parameter. Keeps the smallest set of tokens whose cumulative probability exceeds the probability P',
						typeOptions: {
							minValue: 0,
							maxValue: 1,
							numberPrecision: 2,
						},
					},
					{
						displayName: 'Response MIME Type',
						name: 'responseMimeType',
						type: 'options',
						default: 'text/plain',
						description: 'The MIME type of the response',
						options: [
							{
								name: 'Text/Plain',
								value: 'text/plain',
							},
							{
								name: 'Application/JSON',
								value: 'application/json',
							},
						],
					},
				],
			},
			{
				displayName: 'Safety Settings',
				name: 'safetySettings',
				type: 'collection',
				placeholder: 'Add Safety Setting',
				default: {},
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['generateContent'],
					},
				},
				options: [
					{
						displayName: 'Harassment',
						name: 'harassment',
						type: 'options',
						default: 'BLOCK_MEDIUM_AND_ABOVE',
						description: 'Safety setting for harassment content',
						options: [
							{
								name: 'Block None',
								value: 'BLOCK_NONE',
							},
							{
								name: 'Block Only High',
								value: 'BLOCK_ONLY_HIGH',
							},
							{
								name: 'Block Medium and Above',
								value: 'BLOCK_MEDIUM_AND_ABOVE',
							},
							{
								name: 'Block Low and Above',
								value: 'BLOCK_LOW_AND_ABOVE',
							},
						],
					},
					{
						displayName: 'Hate Speech',
						name: 'hateSpeech',
						type: 'options',
						default: 'BLOCK_MEDIUM_AND_ABOVE',
						description: 'Safety setting for hate speech content',
						options: [
							{
								name: 'Block None',
								value: 'BLOCK_NONE',
							},
							{
								name: 'Block Only High',
								value: 'BLOCK_ONLY_HIGH',
							},
							{
								name: 'Block Medium and Above',
								value: 'BLOCK_MEDIUM_AND_ABOVE',
							},
							{
								name: 'Block Low and Above',
								value: 'BLOCK_LOW_AND_ABOVE',
							},
						],
					},
					{
						displayName: 'Sexually Explicit',
						name: 'sexuallyExplicit',
						type: 'options',
						default: 'BLOCK_MEDIUM_AND_ABOVE',
						description: 'Safety setting for sexually explicit content',
						options: [
							{
								name: 'Block None',
								value: 'BLOCK_NONE',
							},
							{
								name: 'Block Only High',
								value: 'BLOCK_ONLY_HIGH',
							},
							{
								name: 'Block Medium and Above',
								value: 'BLOCK_MEDIUM_AND_ABOVE',
							},
							{
								name: 'Block Low and Above',
								value: 'BLOCK_LOW_AND_ABOVE',
							},
						],
					},
					{
						displayName: 'Dangerous Content',
						name: 'dangerousContent',
						type: 'options',
						default: 'BLOCK_MEDIUM_AND_ABOVE',
						description: 'Safety setting for dangerous content',
						options: [
							{
								name: 'Block None',
								value: 'BLOCK_NONE',
							},
							{
								name: 'Block Only High',
								value: 'BLOCK_ONLY_HIGH',
							},
							{
								name: 'Block Medium and Above',
								value: 'BLOCK_MEDIUM_AND_ABOVE',
							},
							{
								name: 'Block Low and Above',
								value: 'BLOCK_LOW_AND_ABOVE',
							},
						],
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'chat') {
					if (operation === 'generateContent') {
						const message = this.getNodeParameter('message', i) as string;
						const additionalOptions = this.getNodeParameter(
							'additionalOptions',
							i,
							{},
						) as any;
						const safetySettings = this.getNodeParameter(
							'safetySettings',
							i,
							{},
						) as any;

						// Build the request body
						const requestBody: any = {
							contents: [
								{
									role: 'user',
									parts: [
										{
											text: message,
										},
									],
								},
							],
							generationConfig: {
								maxOutputTokens: additionalOptions.maxOutputTokens || 2000,
								responseMimeType:
									additionalOptions.responseMimeType || 'text/plain',
							},
						};

						// Add optional generation config parameters
						if (additionalOptions.temperature !== undefined) {
							requestBody.generationConfig.temperature =
								additionalOptions.temperature;
						}
						if (additionalOptions.topK !== undefined) {
							requestBody.generationConfig.topK = additionalOptions.topK;
						}
						if (additionalOptions.topP !== undefined) {
							requestBody.generationConfig.topP = additionalOptions.topP;
						}

						// Add safety settings if provided
						if (Object.keys(safetySettings).length > 0) {
							requestBody.safetySettings = [];

							if (safetySettings.harassment) {
								requestBody.safetySettings.push({
									category: 'HARM_CATEGORY_HARASSMENT',
									threshold: safetySettings.harassment,
								});
							}
							if (safetySettings.hateSpeech) {
								requestBody.safetySettings.push({
									category: 'HARM_CATEGORY_HATE_SPEECH',
									threshold: safetySettings.hateSpeech,
								});
							}
							if (safetySettings.sexuallyExplicit) {
								requestBody.safetySettings.push({
									category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
									threshold: safetySettings.sexuallyExplicit,
								});
							}
							if (safetySettings.dangerousContent) {
								requestBody.safetySettings.push({
									category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
									threshold: safetySettings.dangerousContent,
								});
							}
						}

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'syrusAiApi',
							{
								method: 'POST',
								url: '',
								body: requestBody,
								json: true,
							},
						);

						// Extract the generated text from the response
						let generatedText = '';
						if (response.candidates && response.candidates.length > 0) {
							const candidate = response.candidates[0];
							if (
								candidate.content &&
								candidate.content.parts &&
								candidate.content.parts.length > 0
							) {
								generatedText = candidate.content.parts[0].text || '';
							}
						}

						returnData.push({
							json: {
								message: message,
								response: generatedText,
								fullResponse: response,
							},
							pairedItem: {
								item: i,
							},
						});
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error:
								error instanceof Error ? error.message : 'Unknown error occurred',
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw new NodeOperationError(
					this.getNode(),
					error instanceof Error ? error : new Error('Unknown error occurred'),
					{
						itemIndex: i,
					},
				);
			}
		}

		return [returnData];
	}
}
