import { useRef } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

socket.on("receiveMessage", (msg) => {
    console.log("Received:", msg);
});

function App() {

    const msgRef = useRef();

    function sendToUser() {
        socket.emit("normalMessage", msgRef.current.value);
        msgRef.current.value = "";
    }

    function broadcast() {
        socket.emit("broadcastMessage", msgRef.current.value);
        msgRef.current.value = "";
    }

    function sendToAll() {
        socket.emit("allMessage", msgRef.current.value);
        msgRef.current.value = "";
    }

    return (
        <div>
            <h1>Socket Demo</h1>

            <input
                ref={msgRef}
                placeholder="Type message"
            />

            <button onClick={sendToUser}>
                Send To User
            </button>

            <button onClick={broadcast}>
                Broadcast
            </button>

            <button onClick={sendToAll}>
                Send To All
            </button>

        </div>
    );
}

export default App;