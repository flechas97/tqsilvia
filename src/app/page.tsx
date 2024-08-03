"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { use, useEffect, useState } from "react";
export default function Home() {

  const [photos, setPhotos] = useState("");
  useEffect( () => {

// Tu clave de API de Flickr
const apiKey = 'ca89d86c9fbfedbd4794147b6604f361';

// El ID del álbum (photoset_id)
const albumId = '72177720319281347';

// Función para obtener las fotos del álbum
const getAlbumPhotos = async (albumId:any) => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&format=json&nojsoncallback=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.photoset) {
            return data.photoset.photo;
        } else {
            console.error("No se encontraron fotos para el álbum");
            return [];
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return [];
    }
};

// Función principal para ejecutar el proceso
const fetchAlbumPhotos = async () => {
    const photos = await getAlbumPhotos(albumId);
    photos.forEach((photo:any) => {
        const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        console.log(photoUrl);
        setPhotos(photoUrl);
    });
};

// Ejecutar la función principal
fetchAlbumPhotos();

  }), [];



  return (
    <>
    <div className="wrapperContent">
      <h1>Últimas Publicaciones</h1>
    </div>
    <div className="cards">
      <div className="card">
        <div>
          <img src='./53898905536_ba009f5b72_c.jpg' />
        </div>
        <div>

        </div>
      </div>
    </div>
     
    </>
 
  );
}
