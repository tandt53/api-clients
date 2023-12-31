import { PetService } from "../services/PetService";
import { newPet } from "../factory/factory";
import { axiosClient } from "../../src/clients/axios.client";
import { OpenAPI } from "../../src";
import { expect } from "chai";
import { ApiRequestOptions } from "../../src/core/ApiRequestOptions";
// import * as fs from "fs";

describe("Pet", () => {
  it("POST /pet - Create pet", async () => {
    console.log(newPet);
    const spec = PetService.addPet(newPet);
    const response = await axiosClient(spec, OpenAPI);
    expect(response.status).to.be.equal(200);
    expect(response.body.id).to.be.deep.equal(newPet.id);
  });

  it("GET /pet/{petId} - Get pet by id", async () => {
    const spec = PetService.getPetById(<number>newPet.id);
    const response = await axiosClient(spec, OpenAPI);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(newPet);
  });

  // it("GET /pet/findByStatus", async function () {
  //   const spec = PetService.findPetsByStatus(newPet.status);
  //   const response = await axiosClient(spec, OpenAPI);
  //   expect(response.status).to.be.equal(200);
  //   const p = response.body.filter((pet) => {
  //     return pet.id === newPet.id;
  //   });
  //
  //   expect(p.length).to.be.equal(1);
  // });

  it("POST /pet/{petId}/uploadImage", async function () {
    const imagePath = "./data/dog.png";
    // const blob = new Blob([fs.readFileSync(imagePath)], {
    //   type: "application/octet-stream",
    // });
    // const spec = PetService.uploadFile(<number>newPet.id, "image", blob);
    // const response = await axiosClient(spec, OpenAPI);
    // expect(response.status).to.be.equal(200);

    const spec2 = PetService.uploadFile2(<number>newPet.id, "image", imagePath);
    const response2 = await axiosClient(spec2, OpenAPI);
    expect(response2.status).to.be.equal(200);
  });

  it("POST /upload - upload pet", async () => {
    const spec: ApiRequestOptions = {
      method: "POST",
      formData: {
        file: "./data/dog.png",
      },
      url: "/upload",
    };

    const response = await axiosClient(spec, OpenAPI);
    expect(response.status).to.be.equal(200);
  });
});
