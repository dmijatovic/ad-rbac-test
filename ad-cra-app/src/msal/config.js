/**
 * Config object to be passed to MSAL on creation.
 * For a full list of msal.js configuration parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_configuration_.html
 * */
export const msalConfig = {
  auth: {
    clientId:"0bb2e832-fe23-44d2-920e-120caf021a74",
    // clientId: "71871e79-cdc1-41da-a74e-abbc39e6c26e",
    // clientId: "0bb2e832-fe23-44d2-920e-120caf021a74",
    authority: "https://login.microsoftonline.com/0f22a838-ece9-49f4-b8dc-e71e2a5d705c",
    //common end point
    // authority: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
    validateAuthority: true,
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true // Set this to "true" to save cache in cookies to address trusted zones limitations in IE (see: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issues-on-IE-and-Edge-Browser)
  }
};

/**
 * Scopes you enter here will be consented once you authenticate. For a full list of available authentication parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
 */
export const loginRequest = {
  scopes: ["openid","roles"],
};

// Add here scopes for access token to be used at the API endpoints.
// The scopes to use need to be defined in
// Azure AD->App Registrations->Expose an API
// If the scope is not defined token request will error with the message
// about missing scope
export const tokenRequest = {
  //add account info here after login
  account: undefined,
  // scopes taken from Azure AD for API
  //"api://0bb2e832-fe23-44d2-920e-120caf021a74/api.test.scope"
  scopes:[
    "api://0bb2e832-fe23-44d2-920e-120caf021a74/api.test.scope"
  ]
};
