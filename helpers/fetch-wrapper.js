import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete
};

function get(url, date){
  //const tmp = parseToken(data);
  const requestOptions = {
    method: 'GET'
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body){
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(url) },
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function _delete(){
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(url)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body){
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(body)
  };
  //console.log(requestOptions)
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response){
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if(!response.ok){
      if([401, 403].includes(response.status)){
        console.log(response)
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
