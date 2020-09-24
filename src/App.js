// eslint-disable-next-line
import React,{useState,useEffect} from 'react';

import {acquireTokenSilent, logout} from './msal/login'
import {callApiWithAccessToken} from './msal/api'
import {tokenRequest} from './msal/config'

import useLoginRedirect from './msal/useRedirect'
import TokenSection from './components/TokenSection'
import ApiResponse from './components/ApiResponse'
import ErrorMessage from './components/ErrorMessage'

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

// eslint-disable-next-line
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

  const getAnalystRoute=()=>{
    getData(apiToken.accessToken).then(resp=>{
      setState(resp)
    }).catch(e=>{
      console.error("getUser...ERROR: ", e)
    })
  }

  const getAdminRoute=()=>{
    getUser(apiToken.accessToken).then(resp=>{
      setState(resp)
    }).catch(e=>{
      console.error("getUser...ERROR: ", e)
    })
  }

  function buttonSection(){
    return (
      <section>
        {apiToken ? <button onClick={getAnalystRoute}>Api request analyst</button> : null }
        {apiToken ? <button onClick={getAdminRoute}>Api request admin</button> : null }
        {userToken ? <button onClick={logout}>Logout</button>: null }
      </section>
    )
  }

  function getContent(){
    if (redirectError){
      return (
        <ErrorMessage
          title="Failed to login"
          message={redirectError} />
      )
    }else{
      return(
        <>
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
        </>
      )
    }
  }

  return (
    <article className="App">
      <h1>App title</h1>
      {getContent()}
    </article>
  );
}

export default App;
