"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
// import styles from "./page.module.css"; // Descomentar si tienes estilos
import { useRouter } from 'next/router';

export default function Page({ params }: any) {
  const albunid = params.albun; // Obtener el ID del álbum de la URL
  console.log(albunid);
  const [photos, setPhotos] = useState<any[]>([]);
  const apiKey = 'ca89d86c9fbfedbd4794147b6604f361';

  useEffect(() => {
    if (albunid) {
      const fetchPhotos = async () => {
        try {
          const photos = await fetchAlbumPhotos(apiKey, albunid as string);
          setPhotos(photos);
        } catch (error) {
          console.error('Error fetching photos:', error);
        }
      };

      fetchPhotos();
    }
  }, [albunid]); // Ejecutar el efecto cuando cambie el ID del álbum

  async function fetchAlbumPhotos(apiKey: string, albumId: string) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&format=json&nojsoncallback=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.photoset.photo.length > 0) {
        return data.photoset.photo.map((photo: any) => ({
          id: photo.id,
          title: photo.title,
          url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg` // 'b' para una imagen de tamaño mediano
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching album photos:', error);
      return [];
    }
  }

  return (
    <>
      <div>
        <h1>Álbum ID: {albunid}</h1>
      </div>
      <div>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} className="foto">
              <img src={photo.url} alt={photo.title} />
              <p>{photo.title}</p>
            </div>
          ))
        ) : (
          <p>No hay fotos para mostrar.</p>
        )}
      </div>
    </>
  );
}
