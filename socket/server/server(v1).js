import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL
    })
);

app.get("/", (req, res) => {
    res.send("Server running");
});

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {

    console.log("Connected:", socket.id);

    // sender only
    socket.on("normalMessage", (msg) => {

        socket.emit(
            "receiveMessage",
            "Normal: " + msg
        );

    });

    // everyone except sender
    socket.on("broadcastMessage", (msg) => {

        socket.broadcast.emit(
            "receiveMessage",
            "Broadcast: " + msg
        );

    });

    // everyone including sender
    socket.on("allMessage", (msg) => {

        io.emit(
            "receiveMessage",
            "All: " + msg
        );

    });

    socket.on("disconnect", (reason) => {

        console.log("Disconnected:", socket.id);
        console.log("Reason:", reason);

    });

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});