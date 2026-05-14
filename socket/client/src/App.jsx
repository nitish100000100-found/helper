import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

function App() {

    const [socketId, setSocketId] = useState("Loading...");
    const [joinedRooms, setJoinedRooms] = useState([]);

    const roomRef = useRef();

    const msgRef = useRef();
    const sendRoomRef = useRef();

    function handleJoin() {

        const room = roomRef.current.value;

        if (!room) return;

        socket.emit("joinRoom", room);

        setJoinedRooms((prev) => {

            if (prev.includes(room))
                return prev;

            return [...prev, room];
        });

        roomRef.current.value = "";
    }

    function handleSend() {

        const msg = msgRef.current.value;
        const room = sendRoomRef.current.value;

        if (!msg || !room) return;

        socket.emit("sendToRoom", {
            msg,
            room
        });

        msgRef.current.value = "";
    }

    useEffect(() => {

        socket.on("connect", () => {
            setSocketId(socket.id);
        });

        socket.on("receiveMessage", (msg) => {
            console.log(msg);
          
        });

        return () => {

            socket.off("connect");
            socket.off("receiveMessage");

        };

    }, []);

    return (
        <div>

            <h1>My Socket ID:</h1>
            <p>{socketId}</p>

            <hr />

            <h2>Joined Rooms</h2>

            {
                joinedRooms.map((room, index) => (
                    <p key={index}>
                        {room}
                    </p>
                ))
            }

            <hr />

            <input
                ref={roomRef}
                placeholder="Room name"
            />

            <button onClick={handleJoin}>
                Join Room
            </button>

            <hr />

            <input
                ref={msgRef}
                placeholder="Message"
            />

            <br /><br />

            <input
                ref={sendRoomRef}
                placeholder="Room name"
            />

            <button onClick={handleSend}>
                Send To Room
            </button>

        </div>
    );
}

export default App;