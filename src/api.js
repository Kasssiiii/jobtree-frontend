const APIUri = "http://localhost:8080";

const getResponse = async (path, params, body, authorization, response) => {
  try {
    params.headers = {};
    if (body) {
      params.body = JSON.stringify(body);
      params.headers["Content-Type"] = "application/json";
    }
    if (authorization) {
      params.headers.Authorization = authorization;
    }

    const resp = await fetch(`${APIUri}/${path}`, params);
    if (resp.ok) {
      const data = await resp.json();
      response(200, data);
    } else {
      const data = await resp.json();
      response(resp.status, { error: data });
    }
  } catch (error) {
    response(500, { error: error });
  }
};

export const loginUser = (username, password, response) => {
  const body = {
    userName: username,
    password: password,
  };
  const params = {
    method: "POST",
  };
  getResponse(`users/${username}`, params, body, null, response);
};

export const registerUser = (username, password, response) => {
  const body = {
    user: username,
    password: password,
  };
  const params = {
    method: "POST",
  };
  getResponse(`users`, params, body, null, response);
};

export const getUserPosts = (token, response) => {
  getResponse("postings/user", {}, null, token, response);
};

export const sendPosting = (jobTitle, company, token, response) => {
  const body = {
    jobTitle: jobTitle,
    company: company,
  };
  const params = {
    method: "POST",
  };
  
  getResponse("postings", params, body, token, response);
};
