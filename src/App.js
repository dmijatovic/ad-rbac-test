// eslint-disable-next-line
import React,{useState,useEffect} from 'react';

import {loginPopup, acquireTokenSilent, logout} from './msal/login'
import {callApiWithAccessToken} from './msal/api'
import {tokenRequest, loginRequest} from './msal/config'

import useLoginRedirect from './msal/useRedirect'

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
  // eslint-disable-next-line
  const [account, userTokenRedirect] = useLoginRedirect({
    scopes:["openid","profile","email"]
  })
  // const [acc, accessTokenRedirect] = useLoginRedirect({
  //   scopes:["api://0bb2e832-fe23-44d2-920e-120caf021a74/api.test.scope"]
  // })
  console.log("account:", account)
  console.log("userTokenRedirect:", userTokenRedirect)

  useEffect(()=>{
    if (account){
      silentToken(account)
        .then(resp=>{
          setApiToken(resp)
        })
        .catch(e=>{
          debugger
          console.error(e)
        })
    }
  },[account])

  useEffect(()=>{
    if (userTokenRedirect){
      const account = userTokenRedirect
      setUserToken(userTokenRedirect)
      silentToken(account)
        .then(resp=>{
          setApiToken(resp)
        })
        .catch(e=>{
          debugger
          console.error(e)
        })
    }
  },[userTokenRedirect])
  // console.log("accessTokenRedirect:", accessTokenRedirect)
  // useEffect(()=>{
  //   console.log("App.useEffect[userTokenRedirect]...enter")
  //   debugger
  //   if (userTokenRedirect){
  //     setUserToken(userTokenRedirect)
  //   }
  // },[account, userTokenRedirect])
  // useEffect(()=>{
  //   console.log("App.useEffect[accessTokenRedirect]...enter")
  //   debugger
  //   if (accessTokenRedirect){
  //     setApiToken(accessTokenRedirect)
  //   }
  // },[acc, accessTokenRedirect])

  const login=(type="popup")=>{
    console.log("Login now")
    if (type==="popup"){
      loginPopup(loginRequest).then(resp=>{
        // console.log("Response received...", resp)
        setUserToken(resp)
      }).catch(e=>{
        console.error(e)
        setUserToken(null)
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

  function apiTokenSection(){
    if (apiToken){
      return(
        <section>
          <h3>Acess token</h3>
          <pre>
            {JSON.stringify(apiToken['accessToken'],null,2)}
          </pre>
        </section>
      )
    }
    return null
  }

  return (
    <article className="App">
      <h1>App here</h1>
      <section>
        <button onClick={()=>login("redirect")}>Login</button>
        {/* <button onClick={login}>Login redirect</button> */}
        {/* {user ? <button onClick={apiRequest}>Api request</button> : ""} */}
        <button onClick={apiRequest}>Api request</button>

        <button onClick={logout}>Logout</button>
      </section>
      <section>
        <h3>User profile</h3>
        <pre>
          {userToken ? JSON.stringify(userToken['accessToken'],null,2) :"Use login button"}
        </pre>
      </section>
      {apiTokenSection()}
      <section>
        <h3>Api response</h3>
        <pre>
          {state? JSON.stringify(state,null,2) :""}
        </pre>
      </section>

    </article>
  );
}

export default App;
