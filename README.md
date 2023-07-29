# API Clients in Typescript

This project introduces a well-structured way to create API clients in Typescript. The structure is based on the output
of [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen).

My idea is to resolve the following issues mainly related to testing:

- Engineer needs to write a lot of boilerplate code to create a client in different http libraries, like axios, fetch,
  codeceptjs, cypress for functional test and k6 for load test.
- Reduce the time and effort to convert the openapi specification to a http client.

## Some improvements over the openapi-typescript-codegen

[openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen) is the best tool I found to
generate a client from an openapi specification. However, it has some limitations:

- The purpose of generated code is seems to be for front end development. It is not flexible enough to be used in
  testing.
- It does not support to generate a client for codeceptjs, cypress or k6.

## Problem and Solution

### Context

In real API testing world, QA engineers have mostly 2 testing approaches:

- API functional test: test the API functionality, like CRUD, authentication, authorization, etc. It is usually done by
  a functional test framework, like codeceptjs, cypress, etc.
- API load test: test the API performance, like response time, throughput, etc. It is usually done by a load test
  framework, like k6, etc.
    - For creating data to be fetched in load test scripts, It is better to use a functional test framework instead of
      k6.

Let's imagine the project using

- cypress for functional test
- k6 for load test
- axios for creating script to generate data for load test

And below are the steps a QA engineer needs to do:

1. Collect information from the openapi specification (json/yaml), like url, method, request body, response body, etc.
2. Convert the specification to code using cypress, k6 and axios. Then we have 3 specifications in ts files using
   different http libraries.
3. Prepare some client code to handle sending requests and receiving responses for each http library.
4. Combine specs, client and test methods together to create a test suite.

### Problems

- The conversion from openapi specification to code is time-consuming and error-prone.
- The client code is duplicated in different http libraries.
- It is hard to maintain the test suite if the openapi specification is changed.

### Solution

Thanks to [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen), we can quickly
convert from openapi specification to code. However, the generated code is not flexible enough to be used in testing. So
I created this project to solve the problems above.

Here is the list of changes I made:

- services: Change the return type of each method from `CancelablePromise<T>` to `ApiRequestOptions` to support
  different response types. Original each service method will form a specification and send a request right away using
  http client library. Now each service method will form a specification and return it to the caller. The caller can
  decide to send the request or not. Besides, caller will decide which http client library to use.
- http clients: Create a client for each http library. Each client will receive a specification and send a request. The
  client will return a response `ApiResult` to the caller.
- Added codeceptjs and k6 clients.

## How to use

1. Prepare an openapi specification in json or yaml format.
2. Generate code using [updated-openapi-typescript-codegen](./openapi-typescript-codegen/README.md)
3. Create test suites with generated clients in different http libraries.

## Examples

- [k6-template-typescript](./examples/k6-template-typescript/README.md)
- [user.test.ts](tests/axios/axios.client.test.ts)
- [user.test.ts](tests/codeceptjs/codeceptjs.client.test.ts)

## Actions

Legend:

| Icon               | Description   |
|--------------------|---------------|
| :white_check_mark: | done          |
| :running:          | in-progress   |
| :warning:          | warning       |
| :recycle:          | need refactor |
| :x:                | unavailable   |



- :white_check_mark: Create a client for axios
- :white_check_mark: Create a client for codeceptjs
- :white_check_mark: Create a client for k6
- :running: Create a client for cypress
- :x: Create a client for fetch
- :x: Create a client for supertest
- :x: Create a client for playwright
- :x: Create a client for puppeteer
- :recycle: Change Blob to FormData
