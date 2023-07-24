import {OpenAPI} from "../../src";
import {ApiResult} from "../../src/core/ApiResult";
import {UserService} from "../services/UserService";
import {newUser} from "../factory/factory";
import {codeceptjsClient} from "../../src/clients/codeceptjs.client";
import chai from "chai";
import {faker} from "@faker-js/faker";

const expect = chai.expect;
Feature('Authentication');
let username;
let password;
Scenario('POST /user - Create user', async function () {
    const createUserSpec = UserService.createUser(newUser);
    const response: ApiResult = await codeceptjsClient(createUserSpec, OpenAPI);
    expect(response.status).to.be.equal(200);
    expect(response.body.username).to.be.deep.equal(createUserSpec.body.username);

    username = createUserSpec.body.username;
    password = createUserSpec.body.password;
});

Scenario('POST /user/login - Login', async function () {
    const loginSpec = UserService.loginUser(username, password);
    const response: ApiResult = await codeceptjsClient(loginSpec, OpenAPI);
    expect(response.status).to.be.equal(200);
});

Scenario('PUT /user/username - update user', async function () {
    const updateUser = {...newUser, firstName: faker.name.firstName()}
    const updateUserSpec = UserService.updateUser(username, updateUser);
    const response: ApiResult = await codeceptjsClient(updateUserSpec, OpenAPI);
    expect(response.status).to.be.equal(200);
    expect(response.body.firstName).to.be.equal(updateUser.firstName);
});

Scenario('DELETE /user/username - delete user', async function () {
    const deleteUserSpec = UserService.deleteUser(username);
    const response: ApiResult = await codeceptjsClient(deleteUserSpec, OpenAPI);
    expect(response.status).to.be.equal(200);

    const getUserSpec = UserService.getUserByName(username);
    const getUserResponse: ApiResult = await codeceptjsClient(getUserSpec, OpenAPI);
    expect(getUserResponse.status).to.be.equal(404);
});
