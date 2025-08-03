import { Server } from "socket.io"


let connections = {}
let messages = {}
let timeOnline = {}

export const connectToSocket = (server) => {    //Socket Server Initialization:   function where we pass express server,  and socket.io is attach with it//
    const io = new Server(server, { 
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });


    io.on("connection", (socket) => {

        console.log("SOMETHING CONNECTED")

        socket.on("join-call", (room) => {

            if (connections[room] === undefined) {    
                connections[room] = []  //Agar ye path pe pehle koi user nahi hai, to us path (room) ke liye ek empty list bana di.//
            }
            connections[room].push(socket.id)   //added the socket id of the current user //

            timeOnline[socket.id] = new Date();
            
            for (let a = 0; a < connections[room].length; a++) {
                io.to(connections[room][a]).emit("user-joined", socket.id, connections[room])   //it will notify every user that new user is joined//
            }

                //if there is some chats in the room then new user will see all the chst here//
            if (messages[room] !== undefined) {
                for (let a = 0; a < messages[room].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[room][a]['data'],
                        messages[room][a]['sender'], messages[room][a]['socket-id-sender'])
                }
            }

        })


        // signalling is useded in webRTC to exchange signal . this is used in betwwen user to establish the connection.//
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender) => {    //msg send by user//
                // checking user is in which room based on the socket.id//
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {


                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }

        })

        socket.on("disconnect", () => {
                //Kitni der tak user online tha, wo time calculate kiya.//
            var diffTime = Math.abs(timeOnline[socket.id] - new Date())

            var key

            for (const [room, person] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < person.length; ++a) {
                    if (person[a] === socket.id) {
                        key = room

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id) //user left and socket.id = konsa user left//
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)


                        if (connections[key].length === 0) {
                            delete connections[key]   //no user left then room deleted//
                        }
                    }
                }

            }


        })


    })


    return io;
}
