import { io } from "../node_modules/socket.io-client/build/esm/index";
import { SOCKET_URL } from "../conifg/default";
import { createContext, useContext } from "react";

const SocketContext = createContext({});

const SocketsProvideer = (props: any) => {
  return <SocketContext.Provider value={{}}>{...props}</SocketContext.Provider>;
};

export const useSockets=()=>useContext(SocketContext)

export default SocketsProvideer; 
