import { io, Socket } from "../node_modules/socket.io-client/build/esm/index";
import { SOCKET_URL } from "../conifg/default";
import { createContext, useContext, useEffect, useState } from "react";
import EVENTS from "../conifg/events";

interface Context {
  socket: Socket;
  userName?: string;
  setUserName: Function;
  messages?: { message: string; time: string; username: string }[];
  setMessages: Function;
  roomId?: string;
  rooms: object;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUserName: () => false,
  setMessages: () => false,
  rooms: {},
  messages:[]
});

const SocketsProvider = (props: any) => {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages,setMessages]=useState([])

  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    };
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);

  });
  
  socket.on(EVENTS.SERVER.JOINED_ROOM,(value)=>{
    setRoomId(value)
    setMessages([])
  })

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }

      setMessages((messages) => [...messages, { message, username, time }]);
    });
  }, [socket]);


  return (
    <SocketContext.Provider
      value={{ socket, userName, setUserName, rooms, roomId, messages,setMessages }}
      {...props}
    />
  );
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
