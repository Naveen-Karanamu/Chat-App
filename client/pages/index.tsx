import Head from "../node_modules/next/head";
import Image from "../node_modules/next/image";
import styles from "../styles/Home.module.css";
import { useSockets } from "../context/socket.context";

export default function Home() {
  const {socket}=useSockets()

  return (
    <>
      <div>
        <h1>Welcome to the chat! {socket.id}</h1>
      </div>
    </>
  );
}
