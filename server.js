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

app.prepare().then(() => {
    server.listen(6061, (err) => {
        if (err) throw err;
        console.log('Web soxcket lancé sur le http://localhost:6061');
    })

    io.on("connection", (socket) => {
        console.log('connecté ! ');

        socket.on("rejoindre salon", (data) => {
            console.log(data)

            socket.join(data.myRoom.id)
            console.log('Connecté au ', data.myRoom.name);

        })

        socket.on("disconnect", () => {
            console.log('Utilisateur déconnecté!');
        })
    })


})