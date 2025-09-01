import useWebSocket from "@/hooks/Websocket";
import React, { useState } from "react";

export default function Chat({ contact }) {
  const [messages, setMessages] = useState([
    { id: 1, fromMe: false, text: "Hello!" },
    { id: 2, fromMe: true, text: "Hi! 😄" },
  ]);
  const [messageHistory, setMessageHistory] = useState([]);
  const { lastMessage, readyState, sendMessage } = useWebSocket('ws://localhost:8080/chat.send');
  const [input, setInput] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), fromMe: true, text: input.trim() }]);
    setInput("");
  }

  return (
    <main className="flex-1 flex flex-col bg-gray-900">
  <header className="h-16 flex items-center px-6 border-b border-gray-800 text-white">
    {contact?.name}
  </header>
  <div className="flex-1 overflow-y-auto p-6 space-y-3">
    {messages.map(msg => (
      <div
        key={msg.id}
        className={`max-w-xl px-4 py-2 rounded-md ${
          msg.fromMe
            ? "bg-indigo-600 text-white ml-auto"
            : "bg-gray-800 text-gray-100 mr-auto"
        }`}
      >
        {msg.text}
      </div>
    ))}
  </div>
  <form className="flex items-center p-4 bg-gray-800 border-t border-gray-700" onSubmit={sendMessage}>
    <input
      className="flex-1 bg-gray-700 text-white rounded px-3 py-2 mr-2 focus:outline-none"
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder="Type a message"
    />
    <button className="bg-indigo-600 text-white rounded px-4 py-2" type="submit">Send</button>
  </form>
</main>
  );
}
