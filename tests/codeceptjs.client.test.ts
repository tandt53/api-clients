import {OpenAPI} from "../src";
import {ApiResult} from "../src/core/ApiResult";
import {codeceptjsClient} from "../src/clients/codeceptjs.client";
import {createUserSpec} from "./factory";

Feature('Authentication');

Scenario('should login success', async function() {
    const response: ApiResult = await codeceptjsClient(createUserSpec, OpenAPI);
    console.log(response);

});
