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


const sendRequest = async <T>(
    config: OpenAPIConfig,
    options: ApiRequestOptions,
    url: string,
    body: any,
    formData: FormData | undefined,
    headers: Record<string, string>,
    onCancel: OnCancel
): Promise<AxiosResponse<T>> => {
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
        return await axios.request(requestConfig); // test
    } catch (error) {
        const axiosError = error as AxiosError<T>;
        if (axiosError.response) {
            return axiosError.response;
        }
        throw error;
    }
};


/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @returns CancelablePromise<ApiResult>
 * @throws ApiError
 */
export const axiosClient = (options: ApiRequestOptions, config: OpenAPIConfig): CancelablePromise<ApiResult> => {
    return new CancelablePromise(async (resolve, reject, onCancel) => {
        try {
            const url = getUrl(config, options);
            const formData = getFormData(options);
            const body = getRequestBody(options);
            const headers = await getHeaders(config, options, formData);

            if (!onCancel.isCancelled) {
                const response = await sendRequest<ApiResult>(config, options, url, body, formData, headers, onCancel);

                const result: ApiResult = {
                    url,
                    ok: isSuccess(response.status),
                    status: response.status,
                    statusText: response.statusText,
                    body: response.data,
                    headers: response.headers
                };

                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    });
};
