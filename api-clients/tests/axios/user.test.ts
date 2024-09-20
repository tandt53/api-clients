import {axiosClient} from "../../src/clients/axios.client";
import {ApiResult} from "../../src/clients/ApiResult";
import {newUser} from "../factory/factory";
import {UserService} from "../services/UserService";
import {OpenAPI} from "../../src/clients/OpenAPI";
import assert = require("assert")

describe('User', function () {
    let username;
    let password;

    it('POST /user - Create user', async function () {
        console.log(newUser)
        const createUserSpec = UserService.createUser(newUser);
        const response: ApiResult = await axiosClient(createUserSpec, OpenAPI);
        assert.equal(response.status, 200);
        assert.equal(response.body.username, createUserSpec.body.username);

        username = createUserSpec.body.username;
        password = createUserSpec.body.password;
    });

    it('POST /user/login - Login', async function () {
        const loginSpec = UserService.loginUser(username, password);
        const response: ApiResult = await axiosClient(loginSpec, OpenAPI);
        assert.equal(response.status, 200);
    });

    // it('PUT /user/username - update user', async function () {
    //     const updateUser = {...newUser, firstName: faker.name.firstName()}
    //     const updateUserSpec = UserService.updateUser(username, updateUser);
    //     const response: ApiResult = await axiosClient(updateUserSpec, OpenAPI);
    //     expect(response.status).to.be.equal(200);
    //     expect(response.body.firstName).to.be.equal(updateUser.firstName);
    // });
    //
    // it('DELETE /user/username - delete user', async function () {
    //     const deleteUserSpec = UserService.deleteUser(username);
    //     const response: ApiResult = await axiosClient(deleteUserSpec, OpenAPI);
    //     expect(response.status).to.be.equal(200);
    //
    //     const getUserSpec = UserService.getUserByName(username);
    //     const getUserResponse: ApiResult = await axiosClient(getUserSpec, OpenAPI);
    //     expect(getUserResponse.status).to.be.equal(404);
    // });

});
