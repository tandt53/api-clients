// import { PetService } from "../services/PetService";
// import { newPet } from "../factory/factory";
import { axiosClient } from "../../src/clients/axios.client";
import { OpenAPI } from "../../src/clients/OpenAPI";
import { expect } from "chai";
// import { ApiRequestOptions } from "../../src/clients/ApiRequestOptions";
import * as fs from "fs";
import FormData from "form-data";
import { ApiRequestOptions } from "../../src/clients/ApiRequestOptions";

describe("Pet", () => {
  // it("should upload", () => {
  //   const axios = require("axios");
  //   const fs = require("fs");
  //   const FormData = require("form-data");
  //   const data = new FormData();
  //   data.append("file", fs.createReadStream("/Users/tando/Downloads/1.png"));
  //   axios
  //     .post("http://localhost:3000/upload", data, {
  //       headers: {
  //         "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // });
  // it("POST /pet - Create pet", async () => {
  //   console.log(newPet);
  //   const spec = PetService.addPet(newPet);
  //   const response = await axiosClient(spec, OpenAPI);
  //   expect(response.status).to.be.equal(200);
  //   expect(response.body.id).to.be.deep.equal(newPet.id);
  // });
  //
  // it("GET /pet/{petId} - Get pet by id", async () => {
  //   const spec = PetService.getPetById(<number>newPet.id);
  //   const response = await axiosClient(spec, OpenAPI);
  //   expect(response.status).to.be.equal(200);
  //   expect(response.body).to.be.deep.equal(newPet);
  // });
  //
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
  // it("POST /pet/{petId}/uploadImage", async function () {
  //   const formData = new FormData();
  //   formData.append("file", fs.createReadStream("./data/dog.png"));
  //   const spec = PetService.uploadFile(<number>newPet.id, "image", {
  //     filePath: "./data/dog.png",
  //     contentType: "image/png",
  //     name: "dog.png",
  //   });
  //   const response = await axiosClient(spec, OpenAPI);
  //   expect(response.status).to.be.equal(200);
  // });

  it("POST /upload - upload pet", async () => {
    const formData = new FormData();
    formData.append("file", fs.createReadStream("./data/dog.png"));
    const spec: ApiRequestOptions = {
      method: "POST",
      formData: {
        file: "./data/dog.png",
        fileKey: "file",
        contentType: "image/png",
        fileName: "dog.png",
      },
      url: "/upload",
    };
    const response = await axiosClient(spec, OpenAPI);
    expect(response.status).to.be.equal(200);
  });
});
