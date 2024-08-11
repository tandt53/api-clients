/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { BinaryType } from "./BinaryType";

export type ApiRequestOptions = {
  readonly method:
    | "GET"
    | "PUT"
    | "POST"
    | "DELETE"
    | "OPTIONS"
    | "HEAD"
    | "PATCH";
  readonly url: string; // this is path
  readonly path?: Record<string, any>; // this is path param
  readonly cookies?: Record<string, any>;
  readonly headers?: Record<string, any>;
  readonly query?: Record<string, any>; // query param
  readonly formData?: Record<string, any> | BinaryType;
  readonly body?: any;
  readonly mediaType?: string;
  readonly responseHeader?: string;
  readonly errors?: Record<number, string>;
};
