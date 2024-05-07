const API_SECRET = 'PIrOGIrAAFbArcbB';
const API_KEY = "w5xiuADAmKLxgl4BYyTmro3wBVXtg4zh";

interface TokenResponse {
  access_token: string;
}

export const getAccessToken = async (): Promise<string> => {
  try {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
    });
    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }
    const data: TokenResponse = await response.json();
    return data.access_token;
  } catch (error: any) {
    throw new Error(`Error getting access token: ${error.message}`);
  }
};