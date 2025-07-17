import axios from "axios";

const rootApiEp = "http://localhost:8000/api/v1";

export const getAccessJWT = () => {
  return localStorage.getItem("accessJWT");
};

const apiProcessor = async ({ method, url, data, headers }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error?.response?.data?.error || error.message,
    };
  }
};

// post new user
export const postNewUser = (data) => {
  const obj = {
    method: "post",
    url: rootApiEp + "/users",
    data,
  };
  return apiProcessor(obj);
};

// login user
export const loginUser = (data) => {
  const obj = {
    method: "post",
    url: rootApiEp + "/users/login",
    data,
  };
  return apiProcessor(obj);
};

// get user profile
export const getUser = () => {
  const obj = {
    method: "get",
    url: rootApiEp + "/users",
    headers: {
      Authorization: getAccessJWT(),
    },
  };
  return apiProcessor(obj);
};
