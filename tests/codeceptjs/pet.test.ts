import {PetService} from "../services/PetService";
import {newPet} from "../factory/factory";
import {OpenAPI} from "../../src";
import {expect} from "chai";
import * as fs from "fs";
import {codeceptjsClient} from "../../src/clients/codeceptjs.client";

Feature('Pet');
Scenario('POST /pet - Create pet', async () => {
    const spec = PetService.addPet(newPet);
    const response = await codeceptjsClient(spec, OpenAPI)
    expect(response.status).to.be.equal(200);
    expect(response.body.id).to.be.deep.equal(newPet.id);
});

Scenario('GET /pet/{petId} - Get pet by id', async () => {
    const spec = PetService.getPetById(<number>newPet.id);
    const response = await codeceptjsClient(spec, OpenAPI)
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(newPet);
});

Scenario('GET /pet/findByStatus', async function () {
    const spec = PetService.findPetsByStatus(newPet.status);
    const response = await codeceptjsClient(spec, OpenAPI)
    expect(response.status).to.be.equal(200);
    const p = response.body.filter((pet) => {
        return pet.id === newPet.id
    });

    expect(p.length).to.be.equal(1);
});

Scenario('POST /pet/{petId}/uploadImage', async function () {
    const imagePath = './data/dog.png';
    const blob = new Blob([fs.readFileSync(imagePath)], {type: 'application/octet-stream'});
    const spec = PetService.uploadFile(<number>newPet.id, "image", blob);
    const response = await codeceptjsClient(spec, OpenAPI)
    expect(response.status).to.be.equal(200);
});

