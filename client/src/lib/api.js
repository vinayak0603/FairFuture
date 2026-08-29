/**
 * Central API Configuration & Endpoint Builder
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === 'production'
    ? 'https://fair-future-orcin.vercel.app'
    : '');

/**
 * Returns full API URL for production/development environment
 * @param {string} endpoint - e.g. '/api/applications'
 */
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
