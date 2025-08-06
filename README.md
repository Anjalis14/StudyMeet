# 📹 StudyMeet – Real-Time Video Conferencing App

**StudyMeet** is a full-stack video conferencing web application designed for seamless virtual collaboration. It provides real-time video, audio, and chat functionality, using **WebRTC** and a **peer-to-peer (P2P)** architecture. Users can join meetings via code, login as guests, and view their meeting history — all within a clean and user-friendly interface.

---

## 🌟 Features

- 🔐 Login via meeting code, guest access, or user account  
- 🎥 Real-time video and audio conferencing with WebRTC  
- 💬 Live group chat during meetings  
- 🕓 Meeting history and session tracking  
- 📩 Secure and fast joining process  
- 🧑‍🤝‍🧑 Peer-to-peer (P2P) communication for low-latency  
- 🧼 Minimal and intuitive UI for smooth user experience

---

## 🛠️ Tech Stack

| Layer        | Tech Used                         |
|--------------|-----------------------------------|
| Frontend     | React.js, HTML5, CSS3, JavaScript |
| Backend      | Node.js, Express.js               |
| Database     | MongoDB, Mongoose                 |
| Real-Time    | WebRTC (Peer-to-Peer)             |
| Signaling    | Socket.io                         |
| Auth         | JWT, bcrypt                       |
| Others       | dotenv, Postman, Nodemailer (optional)

---

## ⚙️ Architecture

[React Frontend]
   ⬇️ Media stream + Chat
[WebRTC P2P Connection]
   ⬆️⬇️ Video/Audio directly between clients

[Socket.io Signaling Server]
   ↔️ Handles WebRTC offer/answer/ICE exchange

[Express Backend + MongoDB]
   🔐 Auth, 🧾 Meeting history, 🗂 User data

🙌 Acknowledgements
WebRTC Docs

Socket.io

React.js

MongoDB


