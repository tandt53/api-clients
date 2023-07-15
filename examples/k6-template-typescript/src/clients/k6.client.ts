import http, {Params} from "k6/http";
import {OpenAPIConfig} from "../core/OpenAPI";
import {ApiRequestOptions} from "../core/ApiRequestOptions";
// @ts-ignore
import {FormData} from 'https://jslib.k6.io/formdata/0.0.2/index.js';
import {ApiResult} from "../core/ApiResult";

function getFormData(options: ApiRequestOptions): FormData | undefined {
    const formData = options.formData;
    if (!formData) {
        return undefined;
    }
    return formData['k6'];
}

export const k6Client = (config: OpenAPIConfig, options: ApiRequestOptions): ApiResult => {
    const url = getUrl(config, options);
    const params: Params = {headers: options.headers};
    let body;

    const jsonBody = getRequestBody(options);
    const formData = getFormData(options);
    if (jsonBody) {
        body = JSON.stringify(jsonBody);
        params.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };
    }
    if (formData) {
        body = formData.body();
        params.headers = {
            ...options.headers,
            ...formData.headers,
            'Content-Type': 'multipart/form-data; boundary=' + formData.boundary
        };
    }
    const response = http.request(options.method, url, body, params);
    return {
        ok: false, url: "",
        status: response.status,
        statusText: response.status_text,
        headers: response.headers,
        body: response.body,
        timings: response.timings
    };
}

const getRequestBody = (options: ApiRequestOptions): any => {
    if (!options.body) {
        return undefined;
    }
    return options.body;
};

const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
    const encoder = config.ENCODE_PATH ?? encodeURI;
    const path = options.url
        .replace('{api-version}', config.VERSION)
        .replace(/{(.*?)}/g, (substring: string, group: string) => {
            if (options.path?.hasOwnProperty(group)) {
                return encoder(String(options.path[group]));
            }
            return substring;
        });

    const url = `${config.BASE_URL}${path}`;
    if (options.query) {
        return `${url}${getQueryString(options.query)}`;
    }
    return url;
};

const getQueryString = (params: Record<string, any>): string => {
    const qs: string[] = [];

    const append = (key: string, value: any) => {
        qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    };

    const process = (key: string, value: any) => {
        if (isDefined(value)) {
            if (Array.isArray(value)) {
                value.forEach(v => {
                    process(key, v);
                });
            } else if (typeof value === 'object') {
                Object.entries(value).forEach(([k, v]) => {
                    process(`${key}[${k}]`, v);
                });
            } else {
                append(key, value);
            }
        }
    };

    Object.entries(params).forEach(([key, value]) => {
        process(key, value);
    });

    if (qs.length > 0) {
        return `?${qs.join('&')}`;
    }

    return '';
};

const isDefined = <T>(value: T | null | undefined): value is Exclude<T, null | undefined> => {
    return value !== undefined && value !== null;
};
