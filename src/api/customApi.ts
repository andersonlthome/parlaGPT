import { ConfigInterface, MessageInterface } from '@type/chat';
import { officialAPIEndpoint } from '@constants/auth';

export const getChatCompletion = async (
  endpoint: string,
  messages: MessageInterface[],
  config: ConfigInterface,
  apiKey?: string
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const response = await fetch(!apiKey ? endpoint : officialAPIEndpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      messages,
      ...config,
      max_tokens: null,
    }),
  });
  if (!response.ok) throw new Error(await response.text());

  const data = await response.json();
  return data;
};

export const getChatCompletionStream = async (
  endpoint: string,
  messages: MessageInterface[],
  config: ConfigInterface,
  apiKey?: string
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  console.log('apiKey', apiKey)
  const response = await fetch(!apiKey ? endpoint : officialAPIEndpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      messages,
      ...config,
      max_tokens: null,
      stream: true,
    }),
  });
  if (response.status === 404 || response.status === 405)
    throw new Error(
      'Message from Better ChatGPT:\nInvalid API endpoint! We recommend you to check your free API endpoint.'
    );

  if (response.status === 429 || !response.ok) {
    const text = await response.text();
    let error = text;
    if (text.includes('insufficient_quota')) {
      error +=
        '\nMessage from Better ChatGPT:\nWe recommend changing your API endpoint or API key';
    }
    throw new Error(error);
  }

  const stream = response.body;
  return stream;
};
