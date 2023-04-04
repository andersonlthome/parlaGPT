export const officialAPIEndpoint = 'https://api.openai.com/v1/chat/completions';
const customAPIEndpoint = 'http://localhost:8080/v1/chat/completions';
export const defaultAPIEndpoint = customAPIEndpoint;

export const availableEndpoints = [
  customAPIEndpoint,
  officialAPIEndpoint,
  // 'https://chatgpt-api.shn.hk/v1/', does'nt work anymore
];
