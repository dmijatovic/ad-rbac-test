// eslint-disable-next-line
import React,{useState,useEffect} from 'react';

import {loginPopup, acquireTokenSilent, logout} from './msal/login'
import {callApiWithAccessToken} from './msal/api'
import {tokenRequest, loginRequest} from './msal/config'

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
  const [apiToken, setApiToken] = useState(null)

  function login(){
    console.log("Login now")
    loginPopup(loginRequest).then(resp=>{
      // console.log("Response received...", resp)
      setUserToken(resp)
    }).catch(e=>{
      console.error(e)
      setUserToken(null)
    })
  }

  const getAccessToken = () =>{
    if (userToken){
      silentToken(userToken)
        .then(resp=>{
          setApiToken(resp)
        })
        .catch(e=>{
          debugger
          console.error(e)
        })
    }
  }

  const apiRequest=()=>{
    if (apiToken){
      getData(apiToken.accessToken).then(resp=>{
        setState(resp)
      }).catch(e=>{
        console.error("getUser...ERROR: ", e)
      })
    }else {
      silentToken(userToken).then(({accessToken})=>{
        console.log("accessToken:", accessToken)
        // return getUser(accessToken)
        getUser(apiToken.accessToken).then(resp=>{
          setState(resp)
        }).catch(e=>{
          console.error("getUser...ERROR: ", e)
        })
      }).then(resp=>{
        setState(resp)
      }).catch(e=>{
        console.error("callApiWithAccessToken...ERROR: ", e)
      })
    }
  }

  function buttonsSection(){
    return (
      <section>
        {userToken ?
          <button onClick={getAccessToken}>Get Access Token </button> :
          <button onClick={()=>login()}>Login</button>
        }
        {
          apiToken ?
          <button onClick={apiRequest}>Api request</button>: null
        }
        {
          userToken ? <button onClick={logout}>Logout</button> : null
        }
      </section>
    )
  }

  return (
    <article className="App">
      <h1>App here</h1>
      {buttonsSection()}
      <TokenSection title="User access token" token={userToken}/>
      <TokenSection title="Access token API" token={apiToken} />
      <ApiResponse title="Api response" data={state} />
    </article>
  );
}

export default App;
