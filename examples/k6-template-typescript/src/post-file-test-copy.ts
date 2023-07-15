import {sleep, check} from 'k6';
import {Options} from 'k6/options';
import {ApiRequestOptions} from "./core/ApiRequestOptions";
import {OpenAPIConfig} from "./core/OpenAPI";
import {k6Client} from "./clients/k6.client";
// @ts-ignore
import {FormData} from 'https://jslib.k6.io/formdata/0.0.2/index.js';
const img = open('./test.png', 'b');

export let options: Options = {
    vus: 1,
    duration: '30s'
};

export default (): void => {
    const fd = new FormData();
    fd.append( img, 'test.png', 'image/png');

    const opts: ApiRequestOptions = {
        url: "/post",
        method: 'POST',
        formData: {
            k6: fd
        }
    }
    const config: OpenAPIConfig = {
        VERSION: "",
        BASE_URL: 'https://httpbin.org'
    }
    const response = k6Client(config, opts);

    console.log(response.body);
    check(response, {
        'status is 200': r => r.status === 200,
    });

    sleep(1);
};
