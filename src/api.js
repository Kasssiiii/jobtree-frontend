// Shared list of posting lanes
export const postingLanes = ["applied", "interview", "offer", "rejected"];
// Delete a posting by id
export const deletePosting = (id, token, response) => {
  getResponse(`postings/${id}`, { method: "DELETE" }, null, token, response);
};
// Get a single posting by id
export const getPostingById = (id, token, response) => {
  getResponse(`postings/${id}`, { method: "GET" }, null, token, response);
};
// Networking contacts API
export const getContacts = (token, response) => {
  getResponse("contacts", { method: "GET" }, null, token, response);
};

export const addContact = (contact, token, response) => {
  const params = { method: "POST" };
  getResponse("contacts", params, contact, token, response);
};

export const updateContact = (id, contact, token, response) => {
  const params = { method: "PUT" };
  getResponse(`contacts/${id}` , params, contact, token, response);
};

export const deleteContact = (id, token, response) => {
  const params = { method: "DELETE" };
  getResponse(`contacts/${id}`, params, null, token, response);
};
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

export const registerUser = (username, password, email, response) => {
  const body = {
    user: username,
    password: password,
    email: email
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

export const updatePosting = (id, jobTitle, company, stage, token, response) => {
  const body = {
    jobTitle: jobTitle,
    company: company,
    stage: stage,
  };
  const params = {
    method: "PUT",
  };

  getResponse(`postings/${id}`, params, body, token, response);
};
