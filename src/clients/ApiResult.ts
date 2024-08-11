/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ApiResult = {
  readonly url: string;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly body: any;
  readonly headers: Record<string, any>;
  readonly timings?: object; // this is for k6 response timings
};
