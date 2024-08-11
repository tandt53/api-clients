import { faker } from "@faker-js/faker";
import { Pet } from "../models/Pet";

export const newUser = {
  id: faker.number.int(),
  email: faker.internet.email().toLowerCase(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password(),
  phone: faker.phone.number(),
  username: faker.person.firstName().toLowerCase(),
};

export const newPet: Pet = {
  id: faker.number.int(),
  category: {
    id: 1,
    name: "Dogs",
  },
  name: faker.person.firstName(),
  photoUrls: [
    "https://img.freepik.com/free-photo/puppy-dog-glass-isolated-white-background_1232-1677.jpg",
  ],
  tags: [
    {
      id: 1,
      name: "Friendly",
    },
  ],
  status: Pet.status.AVAILABLE,
};
