// eslint-disable-next-line
import React,{useState,useEffect} from 'react';

// import {acquireTokenSilent, logout} from './msal/login'
import {callApiWithAccessToken} from './msal/api'
// import {tokenRequest} from './msal/config'

// eslint-disable-next-line
import useLoginRedirect,{logout} from './msal/loginRedirect'
import TokenSection from './components/TokenSection'
import ApiResponse from './components/ApiResponse'
import ErrorMessage from './components/ErrorMessage'

function getData(accessToken){
  return callApiWithAccessToken("http://localhost:5000/data",accessToken)
}

// eslint-disable-next-line
function getUser(accessToken){
  return callApiWithAccessToken("http://localhost:5000/user",accessToken)
}

function App() {
  const [state, setState] = useState(null)
  // eslint-disable-next-line
  const [redirectTokens, redirectError] = useLoginRedirect({
    scopes:[
      "openid","profile","email",
      "api://0bb2e832-fe23-44d2-920e-120caf021a74/api.test.scope"
    ]
  })
  
  console.log("App...enter...redirectTokens:", redirectTokens)

  function getAnalystRoute(){
    const {accessToken} = redirectTokens
    getData(accessToken).then(resp=>{
      setState(resp)
    }).catch(e=>{
      console.error("getUser...ERROR: ", e)
    })
  }

  function getAdminRoute(){
    const {accessToken} = redirectTokens
    getUser(accessToken).then(resp=>{
      setState(resp)
    }).catch(e=>{
      console.error("getUser...ERROR: ", e)
    })
  }

  function buttonSection(){
    if (redirectTokens===null) return null
    const {accessToken=null, idToken=null} = redirectTokens
    return (
      <section>
        {accessToken ? <button onClick={getAnalystRoute}>Api request analyst</button> : null }
        {accessToken ? <button onClick={getAdminRoute}>Api request admin</button> : null }
        {idToken ? <button onClick={logout}>Logout</button>: null }
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
          <TokenSection title="User tokens" token={redirectTokens} />
          {/* {apiError ?
            <div>
              <h4>Failed to aquire API access token</h4>
              {apiError}
            </div>:
            <TokenSection title="API access token" token={apiToken} />
          } */}
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
