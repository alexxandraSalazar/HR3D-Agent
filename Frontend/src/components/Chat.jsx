import React, { useState, useRef, useEffect } from "react";
import { startAudioRecorderWorklet, stopMicrophone } from "../js/audio/audio-recorder";
import { startAudioPlayerWorklet, stopAudioPlayer } from "../js/audio/audio-player";

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArray(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

const Chat = ({ tokens, sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isAudio, setIsAudio] = useState(false);
  const ws = useRef(null);
  const recorderRef = useRef(null);
  const playerRef = useRef(null);

  // WebSocket connection
  useEffect(() => {
    if (!tokens) return;
    ws.current = new window.WebSocket(
      `ws://localhost:8001/ws/${sessionId}?is_audio=${isAudio}`
    );

    ws.current.onopen = () => {
      ws.current.send(
        JSON.stringify({
          access_token: localStorage.getItem(GOOGLE_ACCESS_TOKEN),
          refresh_token: localStorage.getItem(REFRESH_TOKEN),
          client_id: "251711568232-5einlu4qoekpfvevgid6mjhfbd8f9ado.apps.googleusercontent.com",
          client_secret: "GOCSPX-RD8R7Q5rK3cUstI8v3HL3aatfQN",
        })
      );
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.mime_type === "audio/pcm" && playerRef.current) {
        const pcmData = base64ToArray(msg.data);
        playerRef.current.port.postMessage(pcmData);
      } else if (msg.data) {
        setMessages((prev) => [...prev, { data: msg.data, role: msg.role || "agent" }]);
      }
    };

    return () => ws.current && ws.current.close();
    // eslint-disable-next-line
  }, [tokens, sessionId, isAudio]);

  // Audio: Start/Stop recording
  const handleStartAudio = async () => {
    setIsAudio(true);
    const [audioRecorderNode] = await startAudioRecorderWorklet((pcmData) => {
      ws.current.send(
        JSON.stringify({
          mime_type: "audio/pcm",
          data: arrayBufferToBase64(pcmData),
          role: "user",
        })
      );
    });
    recorderRef.current = audioRecorderNode;

    // Start player for agent responses
    const [audioPlayerNode] = await startAudioPlayerWorklet();
    playerRef.current = audioPlayerNode;
  };

  const handleStopAudio = () => {
    setIsAudio(false);
    stopMicrophone();
    stopAudioPlayer();
    recorderRef.current = null;
    playerRef.current = null;
  };

  // Text message send
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!ws.current || ws.current.readyState !== 1) { // 1 = OPEN
    alert("La conexión aún no está lista. Intenta de nuevo en unos segundos.");
    return;
  }
    ws.current.send(
      JSON.stringify({
        mime_type: "text/plain",
        data: input,
        role: "user",
      })
    );
    setMessages((prev) => [...prev, { data: input, role: "user" }]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div id="messages">
        {messages.map((msg, i) => (
          <p key={i} className={msg.role === "user" ? "user-message" : "agent-message"}>
            {msg.data}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} id="messageForm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button className="btn-chat" type="submit" disabled={!input.trim()}>
          Send
        </button>
        {!isAudio ? (
          <button className="btn-chat" type="button" onClick={handleStartAudio}>
            Enable Voice
          </button>
        ) : (
          <button className="btn-chat" type="button" onClick={handleStopAudio}>
            Stop Voice
          </button>
        )}
      </form>
    </div>
  );
};

export default Chat;