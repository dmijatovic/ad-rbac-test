# Azure AD MSAL example

This project is used to test MSAL authentication and authorization.

## MSAL basics

Here we describe what we have learned from this example.

### Initalization

By default, MSAL is configured to set the redirect URI to the current page that it is running on. If you would like to receive the authorization code on a different page than the one running MSAL, you can set this in the configuration. More [info here](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/initialization.md)

```javascript
const msalConfig = {
  auth: {
    clientId: "your_client_id",
    authority: "https://login.microsoftonline.com/{your_tenant_id}",
    redirectUri: "https://contoso.com",
  },
};
```
