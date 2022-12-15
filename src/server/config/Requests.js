import { HttpRequestHub } from "../Host";

export const GetFunc = (url, data = "") => {
  const config = {
    method: "GET",
    data,
    url,
  };
  return HttpRequestHub(config);
};

export const DeleteFunc = (url) => {
  const config = {
    method: "DELETE",
    url,
  };
  return HttpRequestHub(config);
};

export const CreateFunc = (url, data) => {
  const config = {
    method: "POST",
    data,
    url,
  };
  return HttpRequestHub(config);
};

export const EditFunc = (url, data, method = "PUT") => {
  const config = {
    method: method,
    data,
    url,
  };
  return HttpRequestHub(config);
};
