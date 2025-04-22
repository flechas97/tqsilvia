import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    document.title = "Eventos" ; 
  },[])
  return (
    <>
      <h1>ojos cerrados</h1>
    </>
 
  );
}
