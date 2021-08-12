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
 * Données composants datatab
 * data = {
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


            //Récupération des utilisateurs connecté à une room
            io.in(data.room.id).allSockets().then((sockets) => {

                let allUser = [];

                sockets.forEach((socketId) => {
                    let sock = io.of('/').sockets.get(socketId);

                    allUser.push(sock.infoUser);

                })

                io.to(data.room.id).emit('A rejoint le salon', {
                    newUser: socket.infoUser,
                    users: allUser
                });
            })

            let salon;
            // Si un salon est rejoint pour la premier fois, il sera stocké dans dataTab 

            if (dataTab.find(element => element.id === data.room.id) === undefined) {
                salon = {
                    id: data.room.id,
                    content: {
                        name: data.room.name,
                        messages: []
                    }
                }
                dataTab.push(salon);
            }
        })


        socket.on("quitter salon", (data) => {
            // data : {roomID, user :{id, pseudo, age, description}}
            socket.leave(data.roomId);

            //emission de l'event à l'utilisateur
            socket.emit("salon quitté", data.roomId);

            //emission de l'event à tous les autres utilisateurs
            socket.broadcast.to(data.roomId).emit("quitte la conversation", data.user);

        })

        socket.on("récupération room", ({ salonID }) => {
            console.log(salonID)
            // console.log("DataTab => ", dataTab);

            const roomInformation = dataTab.find((element) => element.id === salonID)
            console.log('Info Room => ', roomInformation);

        })


        // Ecoute de l'event "envoi message" => transmettre le message à la room
        socket.on("envoi message", (message, user, myRoom) => {

            // cloneDeep de mes données dataTab 
            // let newDataTab = [...dataTab];


            // Création d'un objet nouveau msg 
            // => { id_msg, content_msg, date, from : user{}}


            let newMessage = { ...message };
            newMessage.from = user;


            // Copie du nouveau msg dans l'historique des msg de la room 
            dataTab.forEach(element => {
                if (element.id === myRoom.id) {
                    element.content.messages.push(newMessage);
                }
            })


            io.to(myRoom.id).emit("reception message", newMessage)
            // socket.broadcast.emit("reception message", newMessage)



            socket.on("disconnect", () => {
                console.log('Utilisateur déconnecté!');
            })
        })


    })

})