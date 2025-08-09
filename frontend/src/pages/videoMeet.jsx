import React, { useRef, useState, useEffect } from "react";
import "../styles/video.css";
import { Badge, IconButton, TextField } from '@mui/material';
import { Button } from '@mui/material';
const serverURL = "http://localhost:8000/";

var connection={};
const peerConfigConnections ={
    "iceServers" :[
        {"url": "stun:stun.l.google.com:19302"},
    ]
}

export default function Videomeet() {
  var socketRef = useRef();
  let socketIdRef = useRef();
  let localVideoRef = useRef();
  let [videoAvailable , setVideoAvailable] = useState(true);
  let [audioAvailable ,setAudioAvailable ] = useState(true);
  let [video , setVideo] = useState();
  let [audio , setAudio] = useState();
  let [screen , setScreen] = useState();
  let [showModel , setShowModel] = useState();
  let [screenAvailabl, setScreenAvailabl] = useState();
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newMessage , setNewMessage ] = useState(0);
  let [askForUsername, setAskForUsername] = useState(true);
  let [username , setUsername] = useState("");
  

  const videoRef = useRef([])
  let [videos , setVideos] = useState([]);
   
  useEffect(()=>{
    console.log("HELLO")
    getPermission();
  })

    const getPermission = async ()=>{
      try{
const videoPermission = await navigator.mediaDevices.getUserMedia({video : true});
      if(videoPermission){
        setVideoAvailable(true);
        console.log("Video Permission granted");
      } else{
        setVideoAvailable(false);
        console.log("Video Permission Denied");
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true});
      if(audioPermission){
        setAudioAvailable(true);
        console.log("Audio Permission granted");
      } else{
        setAudioAvailable(false);
        console.log("Audio Permission Denied");
      }
      if (navigator.mediaDevices.getDisplayMedia){
        setScreenAvailabl(true);
      }else{
        setScreenAvailabl(false);
      }
if(videoAvailable || audioAvailable){
  const userMediaStream = await navigator.mediaDevices.getUserMedia({video: videoAvailable , audio:audioAvailable});
  if(userMediaStream){
    window.localStream = userMediaStream;
    if(localVideoRef.current){
      localVideoRef.current.srcObject = userMediaStream;
    }
  }
}

      } catch(err){
        console.log(err);
      }
    };

    useEffect(()=>{
      getPermission();

    },[])

    let getUserMediaSuccess = (stream) =>{
      
    }
    
//get user media if audio or video is undefine (closed) then the correspoding audio ir video shoub be closed//
    let getUserMedia=()=>{
      if((video && videoAvailable) || ( audio && audioAvailable)){
        navigator.mediaDevices.getUserMedia({video:video , audio:audio})
        .then(()=>{ })
        .catch((e)=> console.log(e))
      } else{
        try{
          let tracks = localVideoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop())
        } catch (e) { }
      }
    }

    let getMedia =()=>{
      setVideo(videoAvailable);
      setAudio(audioAvailable);
      connectToSocketServer();
    }
  return (
    <div>
        {askForUsername === true ? 
        <div>
          <h2>Enter Into Room</h2>
          <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
          <Button variant="contained">Connect</Button>
          <div>
            <video ref={localVideoRef} autoPlay muted></video>
          </div>
          </div> :<></>
      
}


    </div>
  )
}
