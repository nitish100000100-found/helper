import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
});


io.on("connection", (socket) => {

    console.log(
        "User connected:",
        socket.id
    );


    socket.on("joinRoom", (room) => {

        socket.join(room);

        console.log(
            `${socket.id} joined ${room}`
        );

    });


    socket.on(
        "sendToRoom",
        ({ msg, room }) => {

            socket.to(room).emit(
                "receiveMessage",
                `${socket.id}: ${msg}`
            );

        }
    );


    socket.on("disconnect", () => {

        console.log(
            "Disconnected:",
            socket.id
        );

    });

});


server.listen(3000, () => {
    console.log(
        "Server running on port 3000"
    );
});