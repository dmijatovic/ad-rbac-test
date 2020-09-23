import React from 'react'

export default function TokenSection({title="Token section",token}){
  if (token){
    // debugger
    return (
      <section>
        <h3>{title}</h3>
        <pre>
          {token['accessToken']}
        </pre>
        <b>From cache:</b>{ token['fromCache'].toString() }
        <br/>
        <b>scopes:</b> { token['scopes'].toString() }
      </section>
    )
  }else{
    return null
  }
}