import {axiosClient} from "../../src/clients/axios.client";
import {ApiResult} from "../../src/core/ApiResult";
import {newUser} from "../factory/factory";
import chai from 'chai';
import {UserService} from "../services/UserService";
import {OpenAPI} from "../../src";
import {faker} from "@faker-js/faker";

const expect = chai.expect;

describe('User', function () {
    let username;
    let password;

    it('POST /user - Create user', async function () {
        const createUserSpec = UserService.createUser(newUser);
        const response: ApiResult = await axiosClient(createUserSpec, OpenAPI);
        expect(response.status).to.be.equal(200);
        expect(response.body.username).to.be.equal(createUserSpec.body.username);

        username = createUserSpec.body.username;
        password = createUserSpec.body.password;
    });

    it('POST /user/login - Login', async function () {
        const loginSpec = UserService.loginUser(username, password);
        const response: ApiResult = await axiosClient(loginSpec, OpenAPI);
        expect(response.status).to.be.equal(200);
    });

    it('PUT /user/username - update user', async function () {
        const updateUser = {...newUser, firstName: faker.name.firstName()}
        const updateUserSpec = UserService.updateUser(username, updateUser);
        const response: ApiResult = await axiosClient(updateUserSpec, OpenAPI);
        expect(response.status).to.be.equal(200);
        expect(response.body.firstName).to.be.equal(updateUser.firstName);
    });

    it('DELETE /user/username - delete user', async function () {
        const deleteUserSpec = UserService.deleteUser(username);
        const response: ApiResult = await axiosClient(deleteUserSpec, OpenAPI);
        expect(response.status).to.be.equal(200);

        const getUserSpec = UserService.getUserByName(username);
        const getUserResponse: ApiResult = await axiosClient(getUserSpec, OpenAPI);
        expect(getUserResponse.status).to.be.equal(404);
    });

});
