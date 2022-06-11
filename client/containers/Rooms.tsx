import { useRef } from "react";
import EVENTS from "../conifg/events";
import { useSockets } from "../context/socket.context";

const RoomsContainer = () => {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);

  function handleCreateRooom() {
    //Get room name
    const roomName = newRoomRef.current?.value || "";
    if(!String(roomName).trim()) return ;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    newRoomRef.current.value = "";
  }

  return (
      <nav>
        <div>
          <input placeholder="Room Name" ref={newRoomRef}/>
          <button onClick={handleCreateRooom}>CREATE ROOM</button>
        </div>

        {/* {Object.keys(rooms).map((key)=>{
            return <div key={key}>{rooms[key].name}</div>
        })} */}
      </nav> 
  );
};

export default RoomsContainer;
