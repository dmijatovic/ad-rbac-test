import React from 'react'

export default function ErrorMessage({title="Error",message=""}){
  if (message){
    // debugger
    return (
      <section>
        <h3>{title}</h3>
        <p style={{"color":"red"}}>
          {message}
        </p>
      </section>
    )
  }else{
    return null
  }
}