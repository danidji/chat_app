const rooms = [
    { id: "salon1", name: "Salon 1", description: "Amusez vous dans le salon 1!" },
    { id: "salon2", name: "Salon 2", description: "Amusez vous dans le salon 2!" },
    { id: "salon3", name: "Salon 3", description: "Amusez vous dans le salon 3!" },
    { id: "salon4", name: "Salon 4", description: "Amusez vous dans le salon 4!" },
    { id: "salon5", name: "Salon 5", description: "Amusez vous dans le salon 5!" },
    { id: "salon6", name: "Salon 6", description: "Amusez vous dans le salon 6!" },
];

export default async function handler(req, res) {
    console.log(`handler -> req`, req)
    res.send(rooms);
}