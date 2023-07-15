import {axiosClient} from "../src/clients/axios.client";
import {createUserSpec} from "./factory";
import {OpenAPI} from "../src";
import {ApiResult} from "../src/core/ApiResult";

describe('axios client test', function () {
    it('create user successfully', async function () {
        const response: ApiResult = await axiosClient(createUserSpec, OpenAPI);
        console.log(response)
    });
});
