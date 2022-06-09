import { io } from "../node_modules/socket.io-client/build/esm/index";
import { SOCKET_URL } from "../conifg/default";
import { createContext, useContext } from "react";

const socket = io(SOCKET_URL);

const SocketContext = createContext({ socket });

const SocketsProvider = (props: any) => {
  return (
    <SocketContext.Provider value={{ socket }} {...props} />
      
  );
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
