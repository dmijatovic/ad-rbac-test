import React from 'react'

export default function TokenSection({title="Token section",token}){
  if (token){
    // debugger
    return (
      <section>
        <h3>{title}</h3>
        <h5>idToken</h5>
        <pre>
          {token['idToken']}
        </pre>
        <br/>
        <b>roles:</b> { token['idTokenClaims']['roles'].toString() }
        <br/>
        <b>audience:</b> { token['idTokenClaims']['aud'].toString() }
        <h5>accessToken</h5>
        <pre>
          {token['accessToken']}
        </pre>
        <b>from cache:</b>{ token['fromCache'].toString() }
        <br/>
        <b>scopes:</b> { token['scopes'].toString() }
      </section>
    )
  }else{
    return null
  }
}