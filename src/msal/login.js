
import {PublicClientApplication} from '@azure/msal-browser'
import {msalConfig} from './config'

export const msalClient = new PublicClientApplication(msalConfig);

// Create the main msal instance
// configuration parameters are located at authConfig.js
export function loginPopup(loginRequest) {
  return msalClient.loginPopup(loginRequest)
    .then(loginResponse => {
        console.log("loginPopup...id_token acquired at: " + new Date().toString());
        // console.log(loginResponse);
        return loginResponse
    }).catch(error => {
      debugger
      console.log(error);
      // Error handling
      if (error.errorMessage) {
        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf("AADB2C90118") > -1) {
          console.log("This is somehow related to forgot password")
          // msalClient.loginPopup(b2cPolicies.authorities.forgotPassword)
          //   .then(loginResponse => {
          //     console.log(loginResponse);
          //     window.alert("Password has been reset successfully. \nPlease sign-in with your new password.");
          //   })
        }
      }
      logout()
    });
}

// // Create the main msal instance
// // configuration parameters are located at authConfig.js
// export function loginRedirect(loginRequest) {
//   msalClient.loginRedirect(loginRequest)
// }

// Sign-out the user
export function logout() {
  // Removes all sessions, need to call AAD endpoint to do full logout
  msalClient.logout();
}

/**
 * Silently acquire access token for api points or to renieuw(?)
 * @param {Object} tokenRequest {
 *  "account": {
      "homeAccountId": String,
      "environment": String,
      "tenantId": String
      "username": String,
      "name": String
    },
 *  "scopes":[
      "String","String"
    ]
 * }
 */
export function acquireTokenSilent(tokenRequest){
  return msalClient.acquireTokenSilent(tokenRequest)
    .catch(error => {
      console.log("Silent token acquisition fails. Acquiring token using popup");
      console.log(error);
      // fallback to interaction when silent call fails
      // return msalClient.acquireTokenPopup(tokenRequest)
      //   .then(tokenResponse => {
      //     console.log("access_token acquired at: " + new Date().toString());
      //     return tokenResponse;
      //   }).catch(error => {
      //     console.log(error);
      //   });
    });
}
