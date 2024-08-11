import { ApiRequestOptions } from "../../src/clients/ApiRequestOptions";

export class UploadService {
  //curl -X "POST" "http://localhost:8080/upload/multipart/form-data" \
  //          -H 'Content-Type: multipart/form-data; charset=utf-8' \
  //          -F "file=@/Users/tando/projects/api-projects/api-clients/data/dog.png"
  public static uploadFileFormData(): ApiRequestOptions {
    return {
      method: "POST",
      url: `/upload/multipart/form-data`,
      formData: {
        file: {
          value: "/Users/ondrej/testfile.txt",
        },
      },
    };
  }

  // curl -X "POST" "http://localhost:8080/upload/application/x-www-form-urlencoded" \
  //      -H 'Content-Type: application/x-www-form-urlencoded; charset=utf-8' \
  //      --data-urlencode "file=@/Users/tando/projects/api-projects/api-clients/data/dog.png"
  public static uploadUrlEncoded(): ApiRequestOptions {
    return {
      method: "POST",
      url: `/upload/application/x-www-form-urlencoded`,
      mediaType: "application/x-www-form-urlencoded",
      body: {
        file: "content of a test file",
      },
    };
  }
}
