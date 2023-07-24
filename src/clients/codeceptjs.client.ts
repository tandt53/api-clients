/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import axios from 'axios';
import type {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import FormData from 'form-data';

import type {ApiRequestOptions} from '../core/ApiRequestOptions';
import type {ApiResult} from '../core/ApiResult';
import {CancelablePromise} from '../core/CancelablePromise';
import type {OnCancel} from '../core/CancelablePromise';
import type {OpenAPIConfig} from '../core/OpenAPI';
import {getFormData, getHeaders, getRequestBody, getUrl, isSuccess} from "./client.utils";

const {I} = inject();


const sendRequest = async (
    config: OpenAPIConfig,
    options: ApiRequestOptions,
    url: string,
    body: any,
    formData: FormData | undefined,
    headers: Record<string, string>,
    onCancel: OnCancel
): Promise<AxiosResponse<ApiResult>> => {
    const source = axios.CancelToken.source();

    const requestConfig: AxiosRequestConfig = {
        url,
        headers,
        data: body ?? formData,
        method: options.method,
        withCredentials: config.WITH_CREDENTIALS,
        cancelToken: source.token
    };


    onCancel(() => source.cancel('The user aborted a request.'));

    try {
        if (requestConfig.method === 'GET') {
            return await I.sendGetRequest(requestConfig.url, requestConfig.headers);
        }
        if (requestConfig.method === 'POST') {
            return await I.sendPostRequest(requestConfig.url, requestConfig.data, requestConfig.headers);
        }
        if (requestConfig.method === 'PUT') {
            return await I.sendPutRequest(requestConfig.url, requestConfig.data, requestConfig.headers);
        }
        if (requestConfig.method === 'DELETE') {
            return await I.sendDeleteRequest(requestConfig.url, requestConfig.headers);
        }
        if (requestConfig.method === 'PATCH') {
            return await I.sendPatchRequest(requestConfig.url, requestConfig.headers, requestConfig.data);
        }
        return await I.sendGetRequest(requestConfig.url, requestConfig.headers, requestConfig.data);

    } catch (error) {
        const axiosError = error as AxiosError<ApiResult>;
        if (axiosError.response) {
            return axiosError.response;
        }
        throw error;
    }
};

const getResponseBody = (response: AxiosResponse<any>): any => {
    return response.data;
};


/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @returns CancelablePromise<ApiResult>
 * @throws ApiError
 */
export const codeceptjsClient = (options: ApiRequestOptions, config: OpenAPIConfig): CancelablePromise<ApiResult> => {

    return new CancelablePromise(async (resolve, reject, onCancel) => {
        try {
            const url = getUrl(config, options);
            const formData = getFormData(options);
            const body = getRequestBody(options);
            const headers = await getHeaders(config, options, formData);

            if (!onCancel.isCancelled) {
                const response = await sendRequest(config, options, url, body, formData, headers, onCancel);
                const responseBody = getResponseBody(response);

                const result: ApiResult = {
                    url,
                    ok: isSuccess(response.status),
                    status: response.status,
                    statusText: response.statusText,
                    body: responseBody,
                    headers: response.headers
                };
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    });
};
