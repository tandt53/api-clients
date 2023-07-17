import {faker} from "@faker-js/faker";
import {Pet} from "../models/Pet";

export const newUser = {
    "id": faker.datatype.number(),
    "email": faker.internet.email().toLowerCase(),
    "firstName": faker.name.firstName(),
    "lastName": faker.name.lastName(),
    "password": faker.internet.password(),
    "phone": faker.phone.number(),
    "username": faker.name.firstName().toLowerCase()
};


export const newPet: Pet = {
    "id": faker.datatype.number(),
    "category": {
        "id": 1,
        "name": "Dogs"
    },
    "name": faker.name.firstName(),
    "photoUrls": ["https://img.freepik.com/free-photo/puppy-dog-glass-isolated-white-background_1232-1677.jpg"],
    "tags": [
        {
            "id": 1,
            "name": "Friendly"
        }
    ],
    "status": Pet.status.AVAILABLE
}
