"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import lugares from "../../data/lugares.json";
import Link from "next/link";
export default function Home() {

  useEffect(() => {
      document.title = "lugares";
      console.log(lugares);
  },[])

  return (
    <>
      <h1>lugares</h1>
      <div className="tarjetas">
      {lugares.lugares.map((o,i)=>{
          return <div key={i} className="tarjeta">
              <h2>{o.nombre}</h2>
              <p>{o.descripcion}</p>
              <a href={`https://www.google.com/maps/@${o.ubicacion[0]},${o.ubicacion[1]},17.5z?entry=ttu`}>Google Maps</a>
              <iframe width="425" height="350" src={`https://www.openstreetmap.org/export/embed.html?bbox=${o.ubicacion[0]}%2C${o.ubicacion[1]}%2C${o.ubicacion[0]}%2C${o.ubicacion[1]}&amp;layer=mapnik`}></iframe><br/><small><a href="https://www.openstreetmap.org/#map=16/40.4127/-3.6865">Ver el mapa más grande</a></small>
              <div className="btnverWrapper">
                <Link href={`/albunes/${o.albunid}`}>
                        <button className="btnVerFotos">Ver Fotos</button>
                </Link>
              </div>
             
              {/* <Image src={o.imagen} alt={o.nombre} width={200} height={200}></Image> */}
          </div>
      }
      )}
      </div>
    </>
 
  );
  
}
