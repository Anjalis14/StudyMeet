import React from 'react'

const serverURL = "http://localhost:8000/";

var connection={};
const peerConfigConnections ={
    "iceServers" :[
        {"url": "stun:stun.l.google.com:19302"},
    ]
}

export default function Videomeet() {
  return (
    <div>
        <h1>Hello video </h1>
    </div>
  )
}
