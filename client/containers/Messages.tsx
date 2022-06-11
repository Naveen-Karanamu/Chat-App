import { useRef } from "react";
import EVENTS from "../conifg/events";
import { useSockets } from "../context/socket.context";

const MessagesContainer = () => {
  const { socket, messages, roomId, userName, setMessages } = useSockets();
  const newMessageRef = useRef(null);
  const messageEndRef = useRef(null);

  function handleSendMessage() {
    const message = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, userName });

    const date = new Date();

    setMessages([
      ...messages,
      {
        userName: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      }, 
    ]);

    newMessageRef.current.value = "";
  }

  if (!roomId) {
    return <div></div>;
  }

  return (
    <>
      <div>
        {messages.map(({message}, index) => {
          return <p key={index}>{message}</p>;
        })}
      </div>
      <div>
          <textarea rows={1} placeholder="Tell us what you are thinking" ref={newMessageRef}/>
          <button onClick={handleSendMessage}>SEND</button>
      </div>
    </>
  );
};

export default MessagesContainer;


