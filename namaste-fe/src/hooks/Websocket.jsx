import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [readyState, setReadyState] = useState('CONNECTING');

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => setReadyState('OPEN');
    ws.onclose = () => setReadyState('CLOSED');
    ws.onerror = () => setReadyState('ERROR');
    ws.onmessage = (event) => {
      setLastMessage(JSON.parse(event.data));
    };

    return () => ws.close();
  }, [url]);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  return { socket, lastMessage, readyState, sendMessage };
};

export default useWebSocket;