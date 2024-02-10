import { useAuthStore, deleteSession } from "../stores/auth/auth.store";

const _GET = 'GET';
const _POST = 'POST';
const _PUT = 'PUT';
const _PATCH = 'PATCH';
const _DELETE = 'DELETE';
const _API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL_BASE}`;

const req = (method) => {
    return (url, body) => {
        const requestOptions = {
            method,
            url,
            headers: getHeaders(url),
            redirect: 'follow',
            credentials: "same-origin",
            keepalive: true,
        };

        if (!!body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    };
};

const getHeaders = (url) => {
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    const isApiUrl = url.startsWith(_API_BASE_URL);
    if (isLoggedIn && isApiUrl) {
        return {
            'Accept': 'application/json',
            'Authorization': `Bearer ${user.token}`,
            'Access-Control-Allow-Origin': '*',
        };
    } else {
        return {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };
    }
};

const handleResponse = async (res) => {
    const isJSON = res.headers?.get('Content-Type')?.includes('application/json');
    const data = isJSON ? await res.json() : null;
    if (!res.ok) {
        const { user } = useAuthStore();
        if ([401, 403].includes(res.status) && !!user) deleteSession();

        const err = {
            ok: false, 
            data: data?.message || '',
            status: res.status
        };
        return Promise.reject(err);
    }
    return Promise.resolve({
        ok: true,
        data: data || '',
        status: res.status
    });
};

const requestClient = {
    get: req(_GET),
    post: req(_POST),
    put: req(_PUT),
    patch: req(_PATCH),
    delete: req(_DELETE),
};

export { requestClient };