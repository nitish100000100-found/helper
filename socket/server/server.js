import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("sendMessage", ({ msg, targetSocketId }) => {

        console.log("Message:", msg);
        console.log("To:", targetSocketId);

        io.to(targetSocketId).emit(
            "receiveMessage",
            msg
        );

    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});