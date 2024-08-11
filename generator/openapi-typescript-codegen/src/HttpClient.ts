export enum HttpClient {
    FETCH = 'fetch',
    XHR = 'xhr',
    NODE = 'node',
    AXIOS = 'axios',
    ANGULAR = 'angular',
    CODECEPTJS = 'codeceptjs',
    K6 = 'k6',
}

export const getHttpClient = (httpClient: string) => {
    switch (httpClient) {
        case 'fetch':
            return HttpClient.FETCH;
        case 'xhr':
            return HttpClient.XHR;
        case 'node':
            return HttpClient.NODE;
        case 'axios':
        default:
            return HttpClient.AXIOS;
        case 'angular':
            return HttpClient.ANGULAR;
        case 'codeceptjs':
            return HttpClient.CODECEPTJS;
        case 'k6':
            return HttpClient.K6
    }

}
