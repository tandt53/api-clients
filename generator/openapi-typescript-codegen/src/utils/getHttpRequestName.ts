/**
 * Generate the HttpRequest filename based on the selected client
 * @param httpClient The selected httpClient (fetch, xhr, node or axios)
 */
export const getHttpRequestName = (httpClient: string): string => {
    // rewrite switch case
    if (httpClient === 'fetch') {
        return 'FetchHttpRequest';
    } else if (httpClient === 'xhr') {
        return 'XHRHttpRequest';
    } else if (httpClient === 'node') {
        return 'NodeHttpRequest';
    } else if (httpClient === 'axios') {
        return 'AxiosHttpRequest';
    } else if (httpClient === 'angular') {
        return 'AngularHttpRequest';
    } else if (httpClient === 'codeceptjs') {
        return 'CodeceptjsHttpRequest';
    } else if (httpClient === 'k6') {
        return 'K6HttpRequest';
    } else {
        return 'FetchHttpRequest';
    }
};
