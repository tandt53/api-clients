import {sleep, check} from 'k6';
import {Options} from 'k6/options';
import {ApiRequestOptions} from "./core/ApiRequestOptions";
import {OpenAPIConfig} from "./core/OpenAPI";
import {k6Client} from "./clients/k6.client";


export let options: Options = {
    vus: 10,
    duration: '5s'
};

export default () => {

    const opts: ApiRequestOptions = {
        url: "",
        method: 'GET'
    };
    const config: OpenAPIConfig = {
        VERSION: "",
        BASE_URL: 'https://test-api.k6.io'
    }

    const res = k6Client(config, opts);
    console.log(res.body);
    check(res, {
        'status is 200': () => res.status === 200,
    });
    sleep(1);
};


