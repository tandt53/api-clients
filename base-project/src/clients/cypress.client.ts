// import { OpenAPIConfig } from "../core/OpenAPI";
// import { ApiRequestOptions } from "../core/ApiRequestOptions";
//
// function getForm(options: ApiRequestOptions): boolean {
//   return options.mediaType === "x-www-form-urlencoded";
// }
//
// export const cypressClient = (
//   options: ApiRequestOptions,
//   config: OpenAPIConfig,
// ): Cypress.Chainable<Cypress.Response<any>> => {
//   // const auth = getAuth(config);
//   const body = options.body;
//   // const headers = getHeaders(config, options);
//   const method = options.method;
//   const url = `${config.BASE}${options.url}`;
//
//   return cy.request(method, url, body);
// };
//
// const getRequestBody = (options: ApiRequestOptions): any => {
//   if (options.body) {
//     return options.body;
//   }
//   return undefined;
// };
//
// const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
//   const url = `${config.BASE}${options.url}`;
//   if (options.query) {
//     return `${url}${getQueryString(options.query)}`;
//   }
//   return url;
// };
// const getHeaders = async (
//   config: OpenAPIConfig,
//   options: ApiRequestOptions /*, formData?: FormData*/,
// ): Promise<Record<string, string>> => {
//   const token = await resolve(options, config.TOKEN);
//   const username = await resolve(options, config.USERNAME);
//   const password = await resolve(options, config.PASSWORD);
//   const additionalHeaders = await resolve(options, config.HEADERS);
//   // const formHeaders = typeof formData?.getHeaders === 'function' && formData?.getHeaders() || {}
//
//   const headers = Object.entries({
//     Accept: "application/json",
//     ...additionalHeaders,
//     ...options.headers,
//     // ...formHeaders,
//   })
//     .filter(([_, value]) => isDefined(value))
//     .reduce(
//       (headers, [key, value]) => ({
//         ...headers,
//         [key]: String(value),
//       }),
//       {} as Record<string, string>,
//     );
//
//   if (isStringWithValue(token)) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }
//
//   if (isStringWithValue(username) && isStringWithValue(password)) {
//     const credentials = base64(`${username}:${password}`);
//     headers["Authorization"] = `Basic ${credentials}`;
//   }
//
//   if (options.body) {
//     if (options.mediaType) {
//       headers["Content-Type"] = options.mediaType;
//     } else if (isBlob(options.body)) {
//       headers["Content-Type"] = options.body.type || "application/octet-stream";
//     } else if (isString(options.body)) {
//       headers["Content-Type"] = "text/plain";
//     } else if (!isFormData(options.body)) {
//       headers["Content-Type"] = "application/json";
//     }
//   }
//
//   const cookie = options.cookies
//     ? Object.entries(options.cookies)
//         .map(([key, value]) => `${key}=${value}`)
//         .join("; ")
//     : undefined;
//   if (cookie) {
//     headers["Cookie"] = cookie;
//   }
//
//   return headers;
// };
// type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
// const resolve = async <T>(
//   options: ApiRequestOptions,
//   resolver?: T | Resolver<T>,
// ): Promise<T | undefined> => {
//   if (typeof resolver === "function") {
//     return (resolver as Resolver<T>)(options);
//   }
//   return resolver;
// };
// const isDefined = <T>(
//   value: T | null | undefined,
// ): value is Exclude<T, null | undefined> => {
//   return value !== undefined && value !== null;
// };
//
// const isString = (value: any): value is string => {
//   return typeof value === "string";
// };
//
// const isStringWithValue = (value: any): value is string => {
//   return isString(value) && value !== "";
// };
// const isFormData = (value: any): value is FormData => {
//   return value instanceof FormData;
// };
//
// const base64 = (str: string): string => {
//   try {
//     return btoa(str);
//   } catch (err) {
//     // @ts-ignore
//     return Buffer.from(str).toString("base64");
//   }
// };
// const getQueryString = (params: Record<string, any>): string => {
//   const qs: string[] = [];
//
//   const append = (key: string, value: any) => {
//     qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
//   };
//
//   const process = (key: string, value: any) => {
//     if (isDefined(value)) {
//       if (Array.isArray(value)) {
//         value.forEach((v) => {
//           process(key, v);
//         });
//       } else if (typeof value === "object") {
//         Object.entries(value).forEach(([k, v]) => {
//           process(`${key}[${k}]`, v);
//         });
//       } else {
//         append(key, value);
//       }
//     }
//   };
//
//   Object.entries(params).forEach(([key, value]) => {
//     process(key, value);
//   });
//
//   if (qs.length > 0) {
//     return `?${qs.join("&")}`;
//   }
//
//   return "";
// };
// const isBlob = (value: any): value is Blob => {
//   return (
//     typeof value === "object" &&
//     typeof value.type === "string" &&
//     typeof value.stream === "function" &&
//     typeof value.arrayBuffer === "function" &&
//     typeof value.constructor === "function" &&
//     typeof value.constructor.name === "string" &&
//     /^(Blob|File)$/.test(value.constructor.name) &&
//     /^(Blob|File)$/.test(value[Symbol.toStringTag])
//   );
// };
