/**
 * AssetBridge API — public entry point.
 *
 * Usage in app.js:
 *
 *   import * as api from './api/index.js';
 *   import { setAuthTokenProvider } from './api/index.js';
 *
 *   setAuthTokenProvider(async () => {
 *     const user = auth.currentUser;
 *     return user ? user.getIdToken() : null;
 *   });
 *
 *   const holdings = await api.getHoldings();
 */

export { ENDPOINTS, API_PREFIX, API_VERSION } from './endpoints.js';
export { apiRequest, ApiError, setAuthTokenProvider, getApiBaseUrl } from './client.js';
export * from './services.js';
