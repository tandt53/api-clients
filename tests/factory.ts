import {UserService} from "../src";

const user = {
    "email": "email@gmail.com",
    "firstName": "string",
    "lastName": "string",
    "password": "string",
    "phone": "09224234234234",
    "username": "string"
};

export const createUserSpec = UserService.createUser(user);
