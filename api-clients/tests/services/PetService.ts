/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pet } from "../models/Pet";
// import FormData from "form-data";
import { ApiRequestOptions } from "../../src/clients/ApiRequestOptions";
import FormData from "form-data";
import { BinaryType } from "../../src/clients/BinaryType";

// import fs from "fs";

export class PetService {
  /**
   * Update an existing pet
   * Update an existing pet by Id
   * @param formData Update an existent pet in the store
   * @returns Pet Successful operation
   * @throws ApiError
   */
  public static updatePet(formData: Pet): ApiRequestOptions {
    return {
      method: "PUT",
      url: "/pet",
      body: formData,
      mediaType: "application/x-www-form-urlencoded",
      errors: {
        400: `Invalid ID supplied`,
        404: `Pet not found`,
        405: `Validation exception`,
      },
    };
  }

  /**
   * Add a new pet to the store
   * Add a new pet to the store
   * @param requestBody Create a new pet in the store
   * @returns Pet Successful operation
   * @throws ApiError
   */
  public static addPet(requestBody: Pet): ApiRequestOptions {
    return {
      method: "POST",
      url: "/pet",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        405: `Invalid input`,
      },
    };
  }

  /**
   * Finds Pets by status
   * Multiple status values can be provided with comma separated strings
   * @param status Status values that need to be considered for filter
   * @returns Pet successful operation
   * @throws ApiError
   */
  public static findPetsByStatus(
    status: "available" | "pending" | "sold" = "available",
  ): ApiRequestOptions {
    return {
      method: "GET",
      url: "/pet/findByStatus",
      query: {
        status: status,
      },
      errors: {
        400: `Invalid status value`,
      },
    };
  }

  /**
   * Finds Pets by tags
   * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
   * @param tags Tags to filter by
   * @returns Pet successful operation
   * @throws ApiError
   */
  public static findPetsByTags(tags?: Array<string>): ApiRequestOptions {
    return {
      method: "GET",
      url: "/pet/findByTags",
      query: {
        tags: tags,
      },
      errors: {
        400: `Invalid tag value`,
      },
    };
  }

  /**
   * Find pet by ID
   * Returns a single pet
   * @param petId ID of pet to return
   * @returns Pet successful operation
   * @throws ApiError
   */
  public static getPetById(petId: number): ApiRequestOptions {
    return {
      method: "GET",
      url: "/pet/{petId}",
      path: {
        petId: petId,
      },
      errors: {
        400: `Invalid ID supplied`,
        404: `Pet not found`,
      },
    };
  }

  /**
   * Updates a pet in the store with form data
   * @param petId ID of pet that needs to be updated
   * @param name Name of pet that needs to be updated
   * @param status Status of pet that needs to be updated
   * @returns void
   * @throws ApiError
   */
  public static updatePetWithForm(
    petId: number,
    name?: string,
    status?: string,
  ): ApiRequestOptions {
    return {
      method: "POST",
      url: "/pet/{petId}",
      path: {
        petId: petId,
      },
      query: {
        name: name,
        status: status,
      },
      errors: {
        405: `Invalid input`,
      },
    };
  }

  /**
   * Deletes a pet
   * @param petId Pet id to delete
   * @param apiKey
   * @returns void
   * @throws ApiError
   */
  public static deletePet(petId: number, apiKey?: string): ApiRequestOptions {
    return {
      method: "DELETE",
      url: "/pet/{petId}",
      path: {
        petId: petId,
      },
      headers: {
        api_key: apiKey,
      },
      errors: {
        400: `Invalid pet value`,
      },
    };
  }

  /**
   * uploads an image
   * @param petId ID of pet to update
   * @param additionalMetadata Additional Metadata
   * @param requestBody
   * @returns ApiResponse successful operation
   * @throws ApiError
   */
  public static uploadFile(
    petId: number,
    additionalMetadata?: string,
    requestBody?: BinaryType,
  ): ApiRequestOptions {
    return {
      method: "POST",
      url: "/pet/{petId}/uploadImage",
      path: {
        petId: petId,
      },
      query: {
        additionalMetadata: additionalMetadata,
      },
      formData: requestBody,
      mediaType: "application/octet-stream",
    };
  }

  public static uploadFile2(
    petId: number,
    additionalMetadata?: string,
    requestBody?: FormData,
  ): ApiRequestOptions {
    return {
      method: "POST",
      url: "/pet/{petId}/uploadImage",
      path: {
        petId: petId,
      },
      query: {
        additionalMetadata: additionalMetadata,
      },
      formData: requestBody,
      // body: requestBody,
      mediaType: "application/octet-stream",
      // mediaType: "multipart/form-data",
    };
  }
}
