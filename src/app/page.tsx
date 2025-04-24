"use client";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Home() {
    const [albums, setAlbums] = useState<any[]>([]);
    const apiKey = "ca89d86c9fbfedbd4794147b6604f361";
    const username = "roberto.bermejo97";
    const [showContent, setShowContent] = useState(false);
    const [countdown, setCountdown] = useState("");

    const targetDate = new Date("2025-04-27T00:00:00"); // <-- AJUSTA ESTA FECHA
    // const targetDate = new Date("2024-05-01T18:00:00"); // <-- AJUSTA ESTA FECHA
    useEffect(() => {
        const checkDate = () => {
            const now = new Date();
            const timeLeft = targetDate.getTime() - now.getTime();
            if (timeLeft <= 0) {
                setShowContent(true);
            } else {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
                const seconds = Math.floor((timeLeft / 1000) % 60);

                setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        };

        const interval = setInterval(checkDate, 1000);
        checkDate(); // llama una vez al principio

        return () => clearInterval(interval);
    }, []);

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
                            const coverPhoto = await fetchCoverPhoto(
                                apiKey,
                                album.id
                            );
                            return {
                                ...album,
                                coverPhoto,
                            };
                        })
                    );
                    setAlbums(albumsWithCover);
                } else {
                    console.error("Could not fetch user ID");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
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
            console.error("Error fetching user ID:", error);
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
            console.error("Error fetching user albums:", error);
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
            console.error("Error fetching cover photo:", error);
            return null;
        }
    }

    return (
        <>
            {!showContent && (
                <div className="overlay">
                    <div className="countdown">
                        <h1>Hola Marta</h1>
                        <img
                            src="https://images.vexels.com/media/users/3/136172/isolated/preview/148ec098a4529de7141003a8ec519d39-corazon-como-icono.png"
                            alt=""
                            width={100}
                        />
                        <h2>Contando los días para el gran momento...</h2>
                        <p>{countdown}</p>
                    </div>
                </div>
            )}

            {showContent && (
                <>
                    <div className="wrapperContent">
                        <h1>Últimas Publicaciones</h1>
                        <p>
                            Bienvenido a la galería de fotos de Marta y Roberto.
                            Un álbum donde ver el bonito amor que compartimos.
                            <br />
                            <br />
                            Desde el 8 de noviembre de 2024, hemos compartido
                            momentos inolvidables juntos.
                        </p>
                    </div>
                    <div className="albums">
                        {albums.length > 0 ? (
                            albums.map((album: any) => (
                                <div className="hrwrapper" key={album.id}>
                                    <div className="album">
                                        <div className="album-cover">
                                            {album.coverPhoto ? (
                                                <img
                                                    src={album.coverPhoto}
                                                    alt={`Cover of ${album.title._content}`}
                                                />
                                            ) : (
                                                <div>No Cover Photo</div>
                                            )}
                                        </div>
                                        <div className="wrapperinfo">
                                            <h2>{album.title._content}</h2>
                                            <p>{album.description._content}</p>
                                            <div className="btnverWrapper">
                                                <Link
                                                    href={`/albunes/${album.id}`}
                                                >
                                                    <button className="btnVerFotos">
                                                        Ver Fotos
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
