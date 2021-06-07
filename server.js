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

app.prepare().then(() => {
    server.listen(6061, (err) => {
        if (err) throw err;
        console.log('Web soxcket lancé sur le http://localhost:6061');
    })

    io.on("connection", (socket) => {
        console.log('connecté ! ');

        socket.on("rejoindre salon", (data) => {


            console.log(data)
            //connection à la room
            socket.join(data.myRoom.id)

            // io.sockets.clients(data.myRoom.id);

            /**
             * TODO
             * - gerer le remplissage de datatab
             * - envoyer le message qu'à la room concernée
             * */
            // enregistrement de la room dans dataTab, si la room n'est pas déjà présente dans le tab
            let present = false;
            dataTab.forEach(element => {
                if (element.id === data.myRoom.id) {
                    present = true;

                }
            })
            if (!present) {
                dataTab.push(data.myRoom)
            }
            console.log(`socket.on -> dataTab`, dataTab)




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
                console.log('messages ===> ', element.messages);
            })


            io.to(myRoom.id).emit("reception message", {
                message: message,
                from_id: user.id,
                from_name: user.pseudo,
                room: myRoom.id
            })
            // socket.broadcast.emit("reception message", {
            // console.log("Test ==>", dataTab.messages)
        })



        socket.on("disconnect", () => {
            console.log('Utilisateur déconnecté!');
        })
    })


})