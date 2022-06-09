import Head from "../node_modules/next/head";
import Image from "../node_modules/next/image";
import styles from "../styles/Home.module.css";
import { useSockets } from "../context/socket.context";
import RoomsContainer from "../containers/Rooms";
import MessagesContainer from "../containers/Messages";
import { useRef } from "react";

export default function Home() {
  const { socket, userName, setUserName } = useSockets();

  const userNameRef = useRef(null);

  function handleUserName() {
    const value = userNameRef.current.value;
    if (!value) {
      return;
    }
    setUserName(value);

    localStorage.setItem("userName", value);
  }

  return (
    <div>
      <h1>Welcome to the chat! {socket.id}</h1>
      <div>
        {!userName && (
          <div className={styles.usernameWrapper}>
            <div className={styles.usernameInner}>
              <input placeholder="Username" ref={userNameRef} />
              <button className="cta" onClick={handleUserName}>
                START
              </button>
            </div>
          </div>
        )}
        {userName && (
          <div className={styles.container}>
            <RoomsContainer />
            <MessagesContainer />
          </div>
        )}
      </div>
    </div>
  );
}
