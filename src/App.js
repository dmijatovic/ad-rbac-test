// eslint-disable-next-line
import React,{useState,useEffect} from 'react';

import {acquireTokenSilent, logout} from './msal/login'
import {callApiWithAccessToken} from './msal/api'
import {tokenRequest, loginRequest} from './msal/config'

import useLoginRedirect from './msal/useRedirect'
import TokenSection from './components/TokenSection'
import ApiResponse from './components/ApiResponse'

function silentToken(user){
  // debugger
  if (user['account']){
    tokenRequest.account = user.account
  }else {
    tokenRequest.account = user
  }
  return acquireTokenSilent(tokenRequest)
}

function getData(accessToken){
  return callApiWithAccessToken("http://localhost:5000/data",accessToken)
}

function getUser(accessToken){
  return callApiWithAccessToken("http://localhost:5000/user",accessToken)
}

function App() {
  console.log("App...enter")
  const [state, setState] = useState(null)
  const [userToken, setUserToken] = useState(null)
  // eslint-disable-next-line
  const [{apiToken, apiError}, setApiToken] = useState({
    apiToken: null,
    apiError: null
  })
  // eslint-disable-next-line
  const [userTokenRedirect, redirectError] = useLoginRedirect({
    scopes:["openid","profile","email"]
  })
  // console.log("account:", account)
  // console.log("userTokenRedirect:", userTokenRedirect)
  // useEffect(()=>{
  //   if (account){
  //     silentToken(account)
  //       .then(resp=>{
  //         setApiToken({
  //           apiToken:resp,
  //           apiError:null
  //         })
  //       })
  //       .catch(e=>{
  //         debugger
  //         console.error(e)
  //         setApiToken({
  //           apiToken: null,
  //           apiError: e.message
  //         })
  //       })
  //   }
  // },[account])

  useEffect(()=>{
    if (userTokenRedirect){
      // const account = userTokenRedirect
      setUserToken(userTokenRedirect)
      silentToken(userTokenRedirect)
        .then(resp=>{
          setApiToken({
            apiToken: resp,
            apiError: null
          })
        })
        .catch(e=>{
          debugger
          console.error(e)
          setApiToken({
            apiToken: null,
            apiError: e.message
          })
        })
    }
  },[userTokenRedirect])

  const apiRequest=()=>{
    getData(apiToken.accessToken).then(resp=>{
      setState(resp)
    }).catch(e=>{
      console.error("getUser...ERROR: ", e)
    })
  }

  function buttonSection(){
    return (
      <section>
        {apiToken ? <button onClick={apiRequest}>Api request</button> : null }
        {userToken ? <button onClick={logout}>Logout</button>: null }
      </section>
    )
  }

  return (
    <article className="App">
      <h1>App title</h1>
      {buttonSection()}
      <TokenSection title="User token" token={userToken} />
      {apiError ?
        <div>
          <h4>Failed to aquire API access token</h4>
          {apiError}
        </div>:
        <TokenSection title="API access token" token={apiToken} />
      }
      <ApiResponse title="API response" data={state} />
    </article>
  );
}

export default App;
