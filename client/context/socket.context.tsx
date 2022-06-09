import { io, Socket } from "../node_modules/socket.io-client/build/esm/index";
import { SOCKET_URL } from "../conifg/default";
import { createContext, useContext, useState } from "react";

interface Context{
    socket:Socket;
    userName?: string
    setUserName:Function
    roomId?:string
    rooms:object
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({ socket, setUserName:()=>false, rooms:{} });

const SocketsProvider = (props: any) => {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState([]);

  return <SocketContext.Provider value={{ socket, userName, setUserName, rooms,roomId }} {...props} />;
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
