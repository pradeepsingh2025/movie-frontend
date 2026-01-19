// API base URL - must be set via NEXT_PUBLIC_API_URL environment variable
// The backend API server should run on a different port than the Next.js frontend (3000)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// if (!API_BASE_URL) {
//   throw new Error(
//     'NEXT_PUBLIC_API_URL environment variable is not set. ' +
//     'Please create a .env.local file with: NEXT_PUBLIC_API_URL=http://localhost:8000 ' +
//     '(or whatever port your backend API server is running on)'
//   );
// }

function getBaseUrl() {
  // Browser
  if (typeof window !== "undefined") {
    return "";
  }

  // Server (Next.js)
  return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
}

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

async function refreshAccessToken() {
  const res = await fetch(`/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include'
  });

  if (!res.ok) throw new Error('Refresh failed');

  const data = await res.json();
  setAccessToken(data.token);
}

let refreshPromise: Promise<void> | null = null;

async function refreshAccessTokenOnce() {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}


export async function apiFetch(
  url: string,
  options: RequestInit = {},
  retry = true
) {
  // Ensure URL is absolute if it starts with /api
  // const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  const baseUrl = getBaseUrl();
  const fullUrl = `${baseUrl}${url}`;

  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }


  const res = await fetch(fullUrl, {
    ...options,
    headers,
    credentials: 'include'
  });

  if (res.status === 401 && retry) {
    try {
      await refreshAccessTokenOnce();
      return apiFetch(url, options, false);
    } catch (refreshError) {
      // Refresh failed (e.g. invalid refresh token), treat as auth error
      // Fall through to the error handling block below
    }
  }

  if (!res.ok) {
    const errorText = await res.text();
    let errorMessage = `API error ${res.status}: ${errorText.substring(0, 200)}`;

    // Provide more helpful error messages
    if (res.status === 404) {
      errorMessage = `API endpoint not found: ${fullUrl}. Make sure your backend API server is running at ${API_BASE_URL} and the endpoint exists.`;
    } else if (res.status === 401) {
      errorMessage = "Session expired or invalid credentials. Please login again.";
    }

    // Try to parse JSON error if possible for cleaner messages
    try {
      const jsonError = JSON.parse(errorText);
      // Common backend error formats
      if (jsonError.message) errorMessage = jsonError.message;
      if (jsonError.error) errorMessage = jsonError.error;
      if (jsonError.details) errorMessage = jsonError.details;
    } catch (e) {
      // ignore json parse error, use fallback
    }

    import('./errorEvent').then(({ dispatchApiError }) => {
      dispatchApiError(errorMessage, `Error ${res.status}`);
    });

    throw new Error(errorMessage);
  }

  return res.json();
}