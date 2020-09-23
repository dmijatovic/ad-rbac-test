// helper function to access the resource with the token
export function callApiWithAccessToken(endpoint, access_token) {
  const headers = new Headers();
  const bearer = `Bearer ${access_token}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers
  };

  console.log("callApiWithAccessToken: ", endpoint)
  console.log(access_token)

  return fetch(endpoint, options)
    .then(response => response.json())
}