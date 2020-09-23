
// Enter here the user flows and custom policies for your B2C application
// To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
// To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview

// let localStorage:CacheLocation = "localStorage"
// export const b2cPolicies = {
//   names: {
//       signUpSignIn: "b2c_1_susi",
//       forgotPassword: "b2c_1_reset"
//   },
//   authorities: {
//       signUpSignIn: {
//           authority: "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_susi",
//       },
//       forgotPassword: {
//           authority: "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_reset",
//       },
//   },
// }
// The current application coordinates were pre-registered in a B2C tenant.
// export const apiConfig = {
//   b2cScopes: ["https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read"],
//   webApi: "https://fabrikamb2chello.azurewebsites.net/hello"
// };

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
    // validateAuthority: true,
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
  scopes: ["openid"],
};

// Add here scopes for access token to be used at the API endpoints.
// The scopes to use need to be defined in
// Azure AD->App Registrations->Expose an API
// and maybe also in API permissions
export const tokenRequest = {
  //add account info here after login
  account: undefined,
  // scopes taken from Azure AD for API
  //"api://0bb2e832-fe23-44d2-920e-120caf021a74/admin.write",
  //"api://0bb2e832-fe23-44d2-920e-120caf021a74/all.read"
  //"api://0bb2e832-fe23-44d2-920e-120caf021a74/api.test.scope"
  scopes:[
    "api://0bb2e832-fe23-44d2-920e-120caf021a74/api.random.scope"
  ]
};

// all scopes for id_token and access_token
// export const silentRequest = {
//   scopes:[
//     "openid","profile","user.read","email",
//     "api://0bb2e832-fe23-44d2-920e-120caf021a74/all.read"
//   ]
// }
