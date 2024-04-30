// const BASE_PATH='http://localhost:4500'
const BASE_PATH = 'https://backend.sabtech.cloud'

export default async function sendRequest(path, opts = {}) {
  const headers = Object.assign({}, opts.headers || {}, {
    "Content-type": "application/json; charset=UTF-8",
  });

  const response = await fetch(
    `${"https://countriesnow.space/api/v0.1"}${path}`,
    Object.assign({ method: "POST", credentials: "same-origin" }, opts, {
      headers,
    })
  );

  if (response.status !== 200) {
    throw response;
  }

  const data = await response.json();
  return data;
}

export async function sendPublicRequest(path, opts = {}) {
  const headers = Object.assign({}, opts.headers || {}, {
    "Content-type": "application/json; charset=UTF-8",
  });

  const response = await fetch(
    `${BASE_PATH}${path}`,
    Object.assign({ method: "POST", credentials: "same-origin" }, opts, {
      headers,
    })
  );

  if (response.status !== 200) {
    throw response;
  }

  const data = await response.json();
  return data;
}


