const { Socket } = require('dgram');
const { createServer } = require('http');
const next = require('next');
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const socketIO = require("socket.io");
const server = createServer();

const io = socketIO(server, {
    cors: {
        origin: ["http://localhost:6060"],
        method: ["GET", "POST"]
    }
})

const dataTab = [];
/**
 * dataTab = {
 *      salonId,
 *       content : {
 *          nom, 
 *          description,
 *          message : [ ]
 *      }
 *  }
 * 
 */

app.prepare().then(() => {
    server.listen(6061, (err) => {
        if (err) throw err;
        console.log('Web soxcket lancé sur le http://localhost:6061');
    })

    io.on("connection", (socket) => {
        console.log('connecté ! ');

        socket.on("rejoindre salon", (data) => {

            /**    structure donnée ---^
             * data {
             *  user : {id, pseudo, age, description},
             *  room : { id , name, description}
             * }
             */

            //connection à la room
            if (!socket.infoUser) {
                socket.infoUser = data.user
            }
            socket.join(data.room.id)

            socket.emit("salon rejoint", { roomId: data.room.id });


            //Récupération des utilisateur connecté à une room
            io.in(data.room.id).allSockets().then((sockets) => {
                // console.log("TEST RETOUR PROMESSE", sockets)
                let allUser = [];
                sockets.forEach((socketId) => {
                    let sock = io.of('/').sockets.get(socketId);
                    // console.log(`sockets.forEach -> sock`, sock.infoUser)
                    allUser.push(sock.infoUser);

                    io.to(data.room.id).emit('A rejoint le salon', {
                        newUser: sock.infoUser,
                        users: allUser
                    });
                    // console.log(`sockets.forEach -> allUser`, allUser)

                })
                socket.emit('utilisateur en ligne', allUser)

            })

            // console.log(`socket.on -> io.in(data.room.id).allSockets()`, io.in(data.room.id).allSockets())


            // enregistrement de la room dans dataTab, si la room n'est pas déjà présente dans le tab
            // let present = false;
            // dataTab.forEach(element => {
            //     if (element.id === data.myRoom.id) {
            //         present = true;
            //     }
            // })
            // if (!present) {
            //     dataTab.push(data.myRoom)
            // }
        })




        socket.on("quitter salon", (data) => {
            console.log(`socket.on -> data`, data)
            // data : {roomID, user :{id, pseudo, age, description}}
            socket.leave(data.roomId);
            // console.log(`socket.on -> data.roomId`, data.roomId)

            //emission de l'event à l'utilisateur
            socket.emit("salon quitté", data.roomId);
            //emission de l'event à tous les autres utilisateurs
            socket.broadcast.to(data.roomId).emit("quitte la conversation", data.user);

        })


        // Ecoute de l'event "envoi message" => transmettre le message à la room
        socket.on("envoi message", (message, user, myRoom) => {
            // je stocke le message dans dataTab
            dataTab.forEach(element => {
                if (element.id === myRoom.id) {
                    //si j'ai déja enregistré des messages je push à la suite
                    if (element.messages) {
                        element.messages.push({
                            message: message,
                            from_id: user.id,
                        })


                    } else { // sinon je créé un nouveau tableau
                        element.messages = new Array({
                            message: message,
                            from_id: user.id,
                        })
                    }

                }
                // console.log('messages ===> ', element.messages);
            })


            io.to(myRoom.id).emit("reception message", {
                message: message,
                from_id: user.id,
                from_name: user.pseudo,
            })
            // socket.broadcast.emit("reception message", {
        })



        socket.on("disconnect", () => {
            console.log('Utilisateur déconnecté!');
        })
    })


})