import { fromJS, Collection } from "immutable";
import queryString from "query-string";

const defaultOptions = {
  credentials: "include",
};

const defaultHeaderParams = {
  "Content-Type": "application/json; charset=utf-8",
};

const postHeaders = {
  ...defaultHeaderParams,
  "Content-Type": "application/json",
  Accept: "application/json",
};

const formHeaders = {
  ...defaultHeaderParams,
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

function request(url, params) {
  let result;
  let status;
  return fetch(url, {
    headers: defaultHeaderParams,
    ...defaultOptions,
    ...params,
  })
    .then(res => {
      result = res;
      status = res.status;

      if (res.headers.get("content-type") === "text/plain") {
        return res.text();
      }

      return res.json();
    })
    .then(data => {
      if (status >= 200 && status <= 300) {
        return data.response || data;
      }
      throw data;
    })
    .catch(err => {
      if (status >= 200 && status <= 300) {
        return result;
      }
      throw err;
    });
}

function get(url) {
  return request(url);
}

function post(url, body) {
  if (body instanceof Collection) {
    body = body.toJS();
  }

  return request(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });
}

function put(url, body) {
  if (body instanceof Collection) {
    body = body.toJS();
  }

  return request(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: postHeaders,
  });
}

function deleteRequest(url) {
  return request(url, {
    method: "DELETE",
    headers: postHeaders,
  });
}

// this method is being used for form requests which have custom response handling scenarios
function postFormData(url, data) {
  if (data instanceof Collection) {
    data = data.toJS();
  }

  const params = new URLSearchParams();

  for (const key in data) {
    params.set(key, data[key]);
  }

  return fetch(url, {
    ...defaultOptions,
    headers: formHeaders,
    method: "POST",
    body: params,
  });
}

// TODO: unify it with the already existing get method
function getJSON(url, options = {}) {
  const { query = null, ...init } = options;
  init.credentials = init.credentials || "same-origin";
  const queryStr = query ? `?${queryString.stringify(query)}` : "";
  return fetch(`${url}${queryStr}`, init).then(response => {
    if (response.status < 400) {
      return response.json();
    }
    return response.text().then(bodyText => {
      let data;
      let bodyTextFmt;
      let errorMessage;
      try {
        data = JSON.parse(bodyText);
        bodyTextFmt = JSON.stringify(data, null, 2);
      } catch (_) {
        data = null;
        bodyTextFmt = null;
      }
      if (data && Array.isArray(data.errors) && data.errors.length) {
        errorMessage = data.errors
          .map(err => getMessageFromError(err, response.status))
          .join("; ");
      } else {
        errorMessage =
          bodyText || `${response.status} - ${response.statusText}`;
      }
      if (typeof errorMessage === "string") {
        errorMessage = errorMessage.trim();
      }
      const error = new Error(`HTTP Error: ${errorMessage}`);
      error.httpStatus = response.status;
      error.httpStatusText = response.statusText;
      error.httpBody = bodyTextFmt || bodyText;
      error.httpUrl = url;
      error.httpQuery =
        typeof query === "string" ? query : queryString.stringify(query);
      throw error;
    });
  });
}

function getMessageFromError(errData, status) {
  if (errData.code != null && errData.msg != null) {
    if (errData.code === status) {
      return errData.msg;
    }
    return `${errData.code} - ${errData.msg}`;
  }
  try {
    return JSON.stringify(errData);
  } catch (_) {
    return String(errData);
  }
}

const getImmutableResponse = res => {
  return res.then(data => fromJS(data));
};

export {
  get,
  post,
  put,
  deleteRequest,
  postFormData,
  getJSON,
  getImmutableResponse,
};
