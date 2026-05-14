import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

function App() {

    const [socketId, setSocketId] = useState("My id will appear here");

    const msgRef = useRef();
    const targetRef = useRef();

    useEffect(() => {

        socket.on("connect", () => {
            setSocketId("My ID: " + socket.id);
        });

        socket.on("receiveMessage", (msg) => {
            console.log("Received:", msg);
        });

        return () => {
            socket.off("connect");
            socket.off("receiveMessage");
        };

    }, []);

    function sendMessage() {

        const msg = msgRef.current.value;
        const targetSocketId = targetRef.current.value;

        socket.emit("sendMessage", {
            msg,
            targetSocketId
        });

        msgRef.current.value = "";
        targetRef.current.value = "";
    }

    return (
        <div style={{ padding: "20px" }}>

            <h2>Your Socket ID:</h2>
            <p>{socketId}</p>

            <input
                ref={msgRef}
                placeholder="Enter message"
            />

            <br /><br />

            <input
                ref={targetRef}
                placeholder="Send to socket id"
            />

            <br /><br />

            <button onClick={sendMessage}>
                Send
            </button>

        </div>
    );
}

export default App;