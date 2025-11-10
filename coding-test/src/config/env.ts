type NodeEnv = 'development' | 'production' | 'test';

interface AppEnv {
    apiBaseUrl: string;
    appName: string;
    nodeEnv: NodeEnv;
    isDev: boolean;
    isProd: boolean;
    isTest: boolean;
}

const rawEnv = import.meta.env;

const apiBaseUrl = rawEnv.VITE_API_BASE_URL ?? '';
const appName = rawEnv.VITE_APP_NAME ?? 'React Boilerplate';
const nodeEnv = (rawEnv.MODE ?? 'development') as NodeEnv;

if (!apiBaseUrl && rawEnv.PROD) {
    // In production we expect the API base URL to be configured
    console.warn('VITE_API_BASE_URL is not set. API requests may fail.');
}

export const env: AppEnv = {
    apiBaseUrl,
    appName,
    nodeEnv,
    isDev: nodeEnv === 'development',
    isProd: nodeEnv === 'production',
    isTest: nodeEnv === 'test',
};

export default env;
