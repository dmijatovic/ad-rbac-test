# Azure AD API example

This example is tests API authentication using AZURE. It uses passport and [passport-azure-ad](https://github.com/AzureAD/passport-azure-ad) for protecting api point.

## Dependencies

```bash
npm i -s express passport passport-azure-ad
```

## Setup Azure AD

The api is defined as separate app in Azure AD. It redirects to http::/localhost:5000

### Expose API

After creating app in Azure AD, we expose api using menu options on left.
Within this menu options we define 2 things:

- Configure scopes: the scopes are free to define. In the sample I defined write to admin and read to all. These are 2 scopes

For more info [check here](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-expose-web-apis)

### Using the exposed scopes

In the [next article in the series](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis), you configure a client app's registration with access to your web API and the scopes you defined by following the steps this article.

Once a client app registration is granted permission to access your web API, the client can be issued an OAuth 2.0 access token by the Microsoft identity platform. When the client calls the web API, it presents an access token whose scope (scp) claim is set to the permissions you've specified in the client's app registration.

You can expose additional scopes later as necessary. Consider that your web API can expose multiple scopes associated with several operations. Your resource can control access to the web API at runtime by evaluating the scope (scp) claim(s) in the OAuth 2.0 access token it receives.

### Add api to web app api permissions

On web app service (one for frontend) use option API permissions and add the api we just defined with defined scopes.

### Audience

At initial setup audience was not properly defined.

### Manifest and appRoles

On [this page](https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-app-manifest?WT.mc_id=Portal-Microsoft_AAD_RegisteredApps) the properties are explained.

- Make sure that `accessTokenAcceptedVersion` is set to 2 for msal.js
- add application roles in `appRoles`

```json
{
  "id": "9f648b88-55e7-4d87-aa16-6c86a1d7f346",
  "acceptMappedClaims": null,
  "accessTokenAcceptedVersion": 2,
  "addIns": [],
  "allowPublicClient": null,
  "appId": "0bb2e832-fe23-44d2-920e-120caf021a74",
  "appRoles": [
    {
      "allowedMemberTypes": ["User"],
      "description": "TestAPI analyst has access to coding tool",
      "displayName": "TestAPI.Analyst",
      "id": "d1c2ade8-98f8-45fd-aa4a-6d06b947c66f",
      "isEnabled": true,
      "lang": null,
      "origin": "Application",
      "value": "analyst"
    },
    {
      "allowedMemberTypes": ["User"],
      "description": "TestAPI redacteur has access to parts of coding tool",
      "displayName": "TestAPI.Redacteur",
      "id": "1b0b93f1-c353-4407-adf6-e0f0c80a7492",
      "isEnabled": true,
      "lang": null,
      "origin": "Application",
      "value": "redacteur"
    },
    {
      "allowedMemberTypes": ["User"],
      "description": "TestAPI admin has access to management tool",
      "displayName": "TestAPI.Admin",
      "id": "f7f9acfc-ae0c-4d6c-b489-0a81dc1652dd",
      "isEnabled": true,
      "lang": null,
      "origin": "Application",
      "value": "admin"
    }
  ],
  "oauth2AllowUrlPathMatching": false,
  "createdDateTime": "2020-09-19T18:22:34Z",
  "groupMembershipClaims": "None",
  "identifierUris": ["api://0bb2e832-fe23-44d2-920e-120caf021a74"],
  "informationalUrls": {
    "termsOfService": null,
    "support": null,
    "privacy": null,
    "marketing": null
  },
  "keyCredentials": [],
  "knownClientApplications": [],
  "logoUrl": "https://secure.aadcdn.microsoftonline-p.com/c1c6b6c8-bmmymbkadfo3fzzy6nrgl6n91hflwaj4dyzaygzglu4/appbranding/qijx2sjekq7cuiwinw3rxysaaoolw2uvvab4gugovoi/1033/bannerlogo?ts=637365380597520287",
  "logoutUrl": null,
  "name": "WebAPI-node-test1",
  "oauth2AllowIdTokenImplicitFlow": false,
  "oauth2AllowImplicitFlow": false,
  "oauth2Permissions": [
    {
      "adminConsentDescription": "Api test scope for admin",
      "adminConsentDisplayName": "Api test scope",
      "id": "d7775222-95b6-416d-8e5c-b45598fa1373",
      "isEnabled": true,
      "lang": null,
      "origin": "Application",
      "type": "User",
      "userConsentDescription": "Api test scope for users",
      "userConsentDisplayName": "Api test Scope users",
      "value": "api.test.scope"
    }
  ],
  "oauth2RequirePostResponse": false,
  "optionalClaims": {
    "idToken": [],
    "accessToken": [
      {
        "name": "email",
        "source": null,
        "essential": false,
        "additionalProperties": []
      },
      {
        "name": "ipaddr",
        "source": null,
        "essential": false,
        "additionalProperties": []
      }
    ],
    "saml2Token": []
  },
  "orgRestrictions": [],
  "parentalControlSettings": {
    "countriesBlockedForMinors": [],
    "legalAgeGroupRule": "Allow"
  },
  "passwordCredentials": [],
  "preAuthorizedApplications": [],
  "publisherDomain": "dusandv4all.onmicrosoft.com",
  "replyUrlsWithType": [
    {
      "url": "http://localhost:3000",
      "type": "Spa"
    }
  ],
  "requiredResourceAccess": [
    {
      "resourceAppId": "00000003-0000-0000-c000-000000000000",
      "resourceAccess": [
        {
          "id": "64a6cdd6-aab1-4aaf-94b8-3cc8405e90d0",
          "type": "Scope"
        },
        {
          "id": "a154be20-db9c-4678-8ab7-66f6cc099a59",
          "type": "Scope"
        },
        {
          "id": "14dad69e-099b-42c9-810b-d002981feec1",
          "type": "Scope"
        }
      ]
    }
  ],
  "samlMetadataUrl": null,
  "signInUrl": null,
  "signInAudience": "AzureADMultipleOrgs",
  "tags": ["notApiConsumer", "webApi"],
  "tokenEncryptionKeyId": null
}
```

## RBAC (Role based access control) on Azure AD

On [this page](https://docs.microsoft.com/en-us/azure/active-directory/users-groups-roles/roles-custom-overview) the basic term are explained.

On MS site it is stated that configuring custom roles Azure AD Premium P1 license is required (5e/user). But I have manged to add custom roles at the app level. [See read me file]("../README.md") at the root of the project.

### Security principal

A security principal represents the user that is to be assigned access to Azure AD resources. A user is an individual who has a user profile in Azure Active Directory.

### Role

A role definition, or role, is a collection of permissions. A role definition lists the operations that can be performed on Azure AD resources, such as create, read, update, and delete. There are two types of roles in Azure AD:

Built-in roles created by Microsoft that can't be changed.
Custom roles created and managed by your organization.

### Scope

A scope is the restriction of permitted actions to a particular Azure AD resource as part of a role assignment. When you assign a role, you can specify a scope that limits the administrator's access to a specific resource. For example, if you want to grant a developer a custom role, but only to manage a specific application registration, you can include the specific application registration as a scope in the role assignment.

## Docker image

```bash
# build docker image
docker build . -t dv4all/ad-publistat-api:0.0.2

# run docker image
docker run -p 5000:5007 -d dv4all/ad-publistat-api:0.0.2

# push image to DockerHub
docker push dv4all/ad-publistat-api:0.0.2

```
