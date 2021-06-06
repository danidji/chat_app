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
            if (!dataTab.includes(data.myRoom.id)) {
                dataTab.push(data.myRoom)
            }
            console.log('Connecté au ', data.myRoom.name);
            // Ecoute de l'event "envoi message" => transmettre le message à la room

        })

        socket.on("envoi message", (message, user, myRoom) => {
            // console.log(`socket.on -> myRoom`, myRoom)
            // console.log(`socket.on -> user`, user)
            // console.log(`socket.on -> message`, message)
            io.to(myRoom.id).emit("reception message", message)

        })

        socket.on("disconnect", () => {
            console.log('Utilisateur déconnecté!');
        })
    })


})