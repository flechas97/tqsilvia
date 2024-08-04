"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Home() {
  const [albums, setAlbums] = useState<any[]>([]);
  const apiKey = 'ca89d86c9fbfedbd4794147b6604f361';
  const username = 'roberto.bermejo97';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el ID del usuario
        const userId = await fetchUserId(apiKey, username);
        if (userId) {
          // Obtener los álbumes del usuario
          const albumData = await fetchUserAlbums(apiKey, userId);
          // Para cada álbum, obtener la primera foto
          const albumsWithCover = await Promise.all(
            albumData.map(async (album: any) => {
              const coverPhoto = await fetchCoverPhoto(apiKey, album.id);
              return {
                ...album,
                coverPhoto
              };
            })
          );
          setAlbums(albumsWithCover);
        } else {
          console.error('Could not fetch user ID');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente

  async function fetchUserId(apiKey: string, username: string) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=${apiKey}&username=${username}&format=json&nojsoncallback=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.user.nsid;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      return null;
    }
  }

  async function fetchUserAlbums(apiKey: string, userId: string) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.photosets.photoset || [];
    } catch (error) {
      console.error('Error fetching user albums:', error);
      return [];
    }
  }

  async function fetchCoverPhoto(apiKey: string, albumId: string) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&format=json&nojsoncallback=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.photoset.photo.length > 0) {
        const firstPhoto = data.photoset.photo[0];
        return `https://live.staticflickr.com/${firstPhoto.server}/${firstPhoto.id}_${firstPhoto.secret}_b.jpg`; // 'b' para una imagen de tamaño mediano
      }
      return null;
    } catch (error) {
      console.error('Error fetching cover photo:', error);
      return null;
    }
  }

  return (
    <>
      <div className="wrapperContent">
        <h1>Últimas Publicaciones</h1>
      </div>
      <div className="albums">
        {albums.length > 0 ? (
          albums.map((album: any) => (
            <div key={album.id} className="album">
              <div className="album-cover">
                {album.coverPhoto ? (
                  <img src={album.coverPhoto} alt={`Cover of ${album.title._content}`} />
                ) : (
                  <div>No Cover Photo</div>
                )}
              </div>
              <h2>{album.title._content}</h2>
              <Link href={`/albunes/${album.id}`}>
                  <button>Ver Fotos</button>
              </Link>
              <p>{album.description._content}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron álbumes.</p>
        )}
      </div>
    </>
  );
}
