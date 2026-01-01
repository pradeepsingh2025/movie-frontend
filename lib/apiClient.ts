// API base URL - must be set via NEXT_PUBLIC_API_URL environment variable
// The backend API server should run on a different port than the Next.js frontend (3000)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL environment variable is not set. ' +
    'Please create a .env.local file with: NEXT_PUBLIC_API_URL=http://localhost:5000 ' +
    '(or whatever port your backend API server is running on)'
  );
}

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

async function refreshAccessToken() {
  const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include'
  });

  if (!res.ok) throw new Error('Refresh failed');

  const data = await res.json();
  console.log("accessToken from refreshAccessToken function", data.accessToken);
  setAccessToken(data.accessToken);
}

export async function apiFetch(
  url: string,
  options: RequestInit = {},
  retry = true
) {
  // Ensure URL is absolute if it starts with /api
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  
  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  headers.set('Content-Type', 'application/json');

  const res = await fetch(fullUrl, {
    ...options,
    headers,
    credentials: 'include'
  });

  if (res.status === 401 && retry) {
    await refreshAccessToken();
    return apiFetch(url, options, false);
  }

  if (!res.ok) {
    const errorText = await res.text();
    // Provide more helpful error messages
    if (res.status === 404) {
      throw new Error(
        `API endpoint not found: ${fullUrl}. ` +
        `Make sure your backend API server is running at ${API_BASE_URL} and the endpoint exists.`
      );
    }
    throw new Error(`API error ${res.status}: ${errorText.substring(0, 200)}`);
  }

  return res.json();
}