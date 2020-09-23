import React from 'react'

export default function TokenSection({title="Token section",data}){
  if (data){
    return (
      <section>
        <h3>{title}</h3>
        <pre>
          {JSON.stringify(data,null,2)}
        </pre>
      </section>
    )
  }else{
    return null
  }
}