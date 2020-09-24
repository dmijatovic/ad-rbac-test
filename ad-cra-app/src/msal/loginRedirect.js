import {useState, useEffect} from "react";
import {PublicClientApplication} from '@azure/msal-browser'
import {msalConfig} from './config'

export const msalClient = new PublicClientApplication(msalConfig);

// Sign-out the user
export function logout() {
  // Removes all sessions, need to call AAD endpoint to do full logout
  msalClient.logout();
}

/**
 *
 * @param {Object} claims {
 *  account: msal account object,
 *  scopes: ["openid","profile","other-scopes-to-include"]
 * }
 * @returns [token,error]
 */
export function useTokenSilent({account,scopes}){
  const [{token,error},setState] = useState({
    token:null,
    error:null
  })
  useEffect(()=>{
    msalClient.acquireTokenSilent({
      account,
      scopes
    })
      .then(resp=>{
        setState({
          token: resp,
          error: null
        })
      })
      .catch(e=>{
        setState({
          token:null,
          error: e.message
        })
      })
  },[account,scopes])

  return [token, error]
}

/**
 * Authenticate user using MSAL OpenID library for Azure AD.
 * It uses redirect method.
 * @param {Object} claims {
 *  account: msal account object,
 *  scopes: ["openid","profile","other-scopes-to-include"]
 * }
 */
export default function useLoginRedirect(claims){
  console.log("useLoginRedirect...enter")
  const [token, setToken] = useState(null)
  // const [account, setAccount] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    console.log("useLoginRedirect.useEffect[]..enter")
    // Redirect: once login is successful and redirects with tokens
    // the user token will be catched in this function
    // note! if initial run produces null response
    // we try to get user from cache/ls/cookie
    msalClient.handleRedirectPromise()
    .then(resp=>{
      console.log("useLoginRedirect.handleRedirectPromise()...resp:", resp)
      // no redirect response
      if (resp!==null){
        // debugger
        console.log("useRedirect.setToken(resp)...START")
        // setAccount(resp['account'])
        setToken(resp)
        console.info("useRedirect.setToken(resp)...DONE")
      } else if (token === null && error===null) {
        // we do not have token yet
        // 1. try to get account from cache/ls/cookie
        const accounts = msalClient.getAllAccounts()
        if (accounts.length === 1){
          console.log("useLoginRedirect.acquireTokenSilent(claims,account)...CALL")
          // we have account but not id_token/login token
          // require token for claims silently based on send claims/config
          return msalClient.acquireTokenSilent({
            ...claims,
            account: accounts[0]
          })
        } else if (accounts.length===0){
          //user needs to login
          console.log("useLoginRedirect.loginRedirect(claims)...CALL")
          //this promise never returns here
          //it returns to handleRedirectPromise = parent
          //user is not logged in and we have no account info
          //stored locally in MSAL. Start login redirect process
          // debugger
          msalClient.loginRedirect({
            ...claims
          })
        }
      }
    })
    .then(silentToken=>{
      if (silentToken && token===null){
        // debugger
        console.log("useLoginRedirect.setToken(silentToken)...START")
        setToken(silentToken)
        console.info("useLoginRedirect.setToken(silentToken)...DONE")
      }
    })
    .catch(e => {
      debugger
      console.error("useLoginRedirect...ERROR: ",e)
      setToken(null)
      setError(e.message)
    })
  },[claims,token,error])

  return [token, error]
}

