/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AxiosError, AxiosResponse } from 'axios';
import FormData from 'form-data';

import type { ApiRequestOptions } from './ApiRequestOptions';
import type { ApiResult } from './ApiResult';
import { CancelablePromise } from './CancelablePromise';
import type { OpenAPIConfig } from './OpenAPI';
import { OpenAPI } from './OpenAPI';
import fs from 'fs';
import { BinaryType } from './BinaryType';

const { I } = inject();

const isDefined = <T>(
  value: T | null | undefined,
): value is Exclude<T, null | undefined> => {
  return value !== undefined && value !== null;
};

const isString = (value: any): value is string => {
  return typeof value === 'string';
};

const isStringWithValue = (value: any): value is string => {
  return isString(value) && value !== '';
};

const isBlob = (value: any): value is Blob => {
  return (
    typeof value === 'object' &&
    typeof value.type === 'string' &&
    typeof value.stream === 'function' &&
    typeof value.arrayBuffer === 'function' &&
    typeof value.constructor === 'function' &&
    typeof value.constructor.name === 'string' &&
    /^(Blob|File)$/.test(value.constructor.name) &&
    /^(Blob|File)$/.test(value[Symbol.toStringTag])
  );
};

const isFormData = (value: any): value is FormData => {
  return value instanceof FormData;
};

const isSuccess = (status: number): boolean => {
  return status >= 200 && status < 300;
};

const base64 = (str: string): string => {
  try {
    return btoa(str);
  } catch (err) {
    // @ts-ignore
    return Buffer.from(str).toString('base64');
  }
};

const getQueryString = (params: Record<string, any>): string => {
  const qs: string[] = [];

  const append = (key: string, value: any) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };

  const process = (key: string, value: any) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
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

const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
  const encoder = config.ENCODE_PATH || encodeURI;

  const path = options.url
    .replace('{api-version}', config.VERSION)
    .replace(/{(.*?)}/g, (substring: string, group: string) => {
      if (options.path?.hasOwnProperty(group)) {
        return encoder(String(options.path[group]));
      }
      return substring;
    });

  const url = `${config.BASE}${path}`;
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
};

const isBinaryType = (value: any): value is BinaryType => {
  return (
    typeof value === 'object' &&
    typeof value.file === 'string' &&
    (typeof value.fileKey === 'string' ||
      typeof value.fileKey === 'undefined') &&
    typeof value.fileName === 'string' &&
    typeof value.contentType === 'string'
  );
};

const getFormData = (options: ApiRequestOptions): FormData | undefined => {
  if (options.formData) {
    const formData = new FormData();

    const appendBinary = (value: BinaryType, key?: string) => {
      formData.append(
        key ? key : value.fileKey ? value.fileKey : 'file',
        fs.createReadStream(value.file),
        {
          filename: value.fileName,
          contentType: value.contentType,
        },
      );
    };

    const process = (key: string, value: any) => {
      if (isBinaryType(value)) {
        appendBinary(value, key);
      } else if (isString(value) || isBlob(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    };

    if (isBinaryType(options.formData)) {
      const data = options.formData;
      appendBinary(data);
      return formData;
    }

    Object.entries(options.formData)
      .filter(([_, value]) => isDefined(value))
      .forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => process(key, v));
        } else {
          process(key, value);
        }
      });

    return formData;
  }
  return undefined;
};

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

const resolve = async <T>(
  options: ApiRequestOptions,
  resolver?: T | Resolver<T>,
): Promise<T | undefined> => {
  if (typeof resolver === 'function') {
    return (resolver as Resolver<T>)(options);
  }
  return resolver;
};

const getHeaders = async (
  config: OpenAPIConfig,
  options: ApiRequestOptions,
  formData?: FormData,
): Promise<Record<string, string>> => {
  const configHeaders = {}; // headers info from OpenAPIConfig
  const optionHeaders = {}; // headers info from API options

  // infos from config
  const token = await resolve(options, config.TOKEN);
  const username = await resolve(options, config.USERNAME);
  const password = await resolve(options, config.PASSWORD);
  const additionalHeaders = await resolve(options, config.HEADERS);

  if (isStringWithValue(token)) {
    configHeaders['Authorization'] = `Bearer ${token}`;
  }

  if (isStringWithValue(username) && isStringWithValue(password)) {
    const credentials = base64(`${username}:${password}`);
    configHeaders['Authorization'] = `Basic ${credentials}`;
  }

  // info from form data
  const formHeaders =
    (typeof formData?.getHeaders === 'function' && formData?.getHeaders()) ||
    {};

  // info from request body
  if (options.body) {
    if (options.mediaType) {
      optionHeaders['Content-Type'] = options.mediaType;
    } else if (isBlob(options.body)) {
      optionHeaders['Content-Type'] =
        options.body.type || 'application/octet-stream';
    } else if (isString(options.body)) {
      optionHeaders['Content-Type'] = 'text/plain';
    } else if (!isFormData(options.body)) {
      optionHeaders['Content-Type'] = 'application/json';
    }
  }

  // merge all headers: configHeaders, optionHeaders, formHeaders
  const headers = Object.assign(
    { ...additionalHeaders },
    configHeaders,
    options.headers,
    optionHeaders,
    formHeaders,
  );

  return headers;
};

const getRequestBody = (options: ApiRequestOptions): any => {
  if (options.body) {
    if (isBlob(options.body)) {
      return options.body.stream();
    }
    return options.body;
  }
  return undefined;
};

const sendRequest = async (
  options: ApiRequestOptions,
  url: string,
  body: any,
  formData: FormData | undefined,
  headers: Record<string, string>,
): Promise<AxiosResponse<ApiResult>> => {
  const method = options.method;
  const data = body ?? formData;

  try {
    if (method === 'GET') {
      return await I.sendGetRequest(url, headers);
    }
    if (method === 'POST') {
      return await I.sendPostRequest(url, data, headers);
    }
    if (method === 'PUT') {
      return await I.sendPutRequest(url, data, headers);
    }
    if (method === 'DELETE') {
      return await I.sendDeleteRequest(url, headers);
    }
    if (method === 'PATCH') {
      return await I.sendPatchRequest(url, data, headers);
    }
    return await I.sendGetRequest(url, headers);
  } catch (error) {
    const axiosError = error as AxiosError<ApiResult>;
    if (axiosError.response) {
      return axiosError.response;
    }
    throw error;
  }
};

const getResponseBody = (response: AxiosResponse<any>): any => {
  if (response.status !== 204) {
    return response.data;
  }
  return undefined;
};

/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @returns CancelablePromise<ApiResult>
 * @throws ApiError
 */
export const codeceptjsClient = (
  options: ApiRequestOptions,
  config?: OpenAPIConfig,
): CancelablePromise<ApiResult> => {
  return new CancelablePromise(async (resolve, reject, onCancel) => {
    config = config ?? OpenAPI;
    try {
      const url = getUrl(config, options);
      const formData = getFormData(options);
      const body = getRequestBody(options);
      const headers = await getHeaders(config, options, formData);

      if (!onCancel.isCancelled) {
        const response = await sendRequest(
          options,
          url,
          body,
          formData,
          headers
        );
        const responseBody = getResponseBody(response);

        const result: ApiResult = {
          url,
          ok: isSuccess(response.status),
          status: response.status,
          statusText: response.statusText,
          body: responseBody,
          headers: response.headers,
        };
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  });
};
