// scopes taken from Azure AD
// CLAIMS WITHOUT COMPLETE URL, ONLY STRING PARTS
// THAT ARE SHOW IN scp
// Regitestred API in Azure AD need to have these
// defined in App Registrations->Expose an API
const scopes=[
  "api.analysis.tool"
]

// We pass these options in to the BearerStrategy.
// for options see https://github.com/AzureAD/passport-azure-ad#4212-options
let options = {
  //OpenID Connect metadata document
  // identityMetadata: "https://login.microsoftonline.com/0f22a838-ece9-49f4-b8dc-e71e2a5d705c/v2.0/.well-known/openid-configuration",
  // common point - requires passing tenantIdOrName:"0f22a838-ece9-49f4-b8dc-e71e2a5d705c" in passport
  identityMetadata: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
  //ID of API application registration
  clientID: "0bb2e832-fe23-44d2-920e-120caf021a74",

  // This can be a string or an array of strings. See validateIssuer for the situation that requires issuer.
  issuer:"https://login.microsoftonline.com/f22a838-ece9-49f4-b8dc-e71e2a5d705c/v2.0",
  // Required to set to false if you don't want to validate issuer, default value is true.
  validateIssuer: false,

  // Required to set to true if using req as the first paramter in the verify function, default value is false.
  passReqToCallback: false,
  // Required to set to true if you are using B2C tenant.
  isB2C: false,

  //Required if you are using B2C tenant. It is a string starting with 'B2C_1_' (case insensitive).
  // policyName: config.creds.policyName,

  //Required if you allow access_token whose aud claim contains multiple values.
  // allowMultiAudiencesInToken: config.creds.allowMultiAudiencesInToken,

  //Must be a string or an array of strings.
  //We invalidate the aud claim in access_token against audience.
  //The default value for audience is clientID of this API or frontend registered app.
  //If the ID does not match one in access_token prop `aud` access is not granted
  audience: [
    //api application id from azure
    "0bb2e832-fe23-44d2-920e-120caf021a74"
  ],

  // Logging level. 'info', 'warn' or 'error'.
  loggingLevel: 'error',
  // If this is set to true, no personal information such as tokens and claims will be logged. The default value is true.
  // to see more login info set this to false during development
  loggingNoPII: true,
  // This value is the clock skew (in seconds) allowed in token validation. It must be a positive integer. The default value is 300 seconds.
  clockSkew: 60,
  // This value is an array of scopes you accept. If this value is provided, we will check if the token contains one of these accepted scopes.
  // If this value is not provided, we won't check token scopes.
  // The scopes in this array do not have to be registred in AzureAD(?)
  scope: scopes
};

module.exports = options
