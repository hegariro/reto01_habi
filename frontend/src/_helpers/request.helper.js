import { useAuthStore } from "../store/auth/auth.store";

const _GET = 'get';
const _POST = 'post';
const _PUT = 'put';
const _PATCH = 'patch';
const _DELETE = 'delete';
const _API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL_BASE}`;

const requestClient = {
    get: request(_GET),
    post: request(_POST),
    put: request(_PUT),
    patch: request(_PATCH),
    delete: request(_DELETE),
};

const request = (method) => {
    return (url, body) => {
        const requestOptions = {
            method,
            url,
            headers: getHeaders(url)
        };

        if (!!body) {
            requestOptions.headers['content-type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    };
};

const getHeaders = (url) => {
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.accessToken;
    const isApiUrl = url.startsWith(_API_BASE_URL);
    if (isLoggedIn && isApiUrl) {
        return {
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        };
    } else {
        return {};
    }
};

const handleResponse = async (res) => {
    const isJSON = res.headers?.get('content-type')?.includes('application/json');
    const data = isJSON ? await res.json() : null;
    if (!res.ok) {
        const { user, logout } = useAuthStore();
        if ([401, 403].includes(res.status) && user) logout();

        const err = (data && data.message) || res.status;
        return Promise.reject(err);
    }
};

export { requestClient };