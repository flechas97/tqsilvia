'use client'

import Image from "next/image";


export default function Header() {
    const items = ["Lugares", "Eventos", "Ojos Cerrados"];

    function openNav() {
        const navMob = document.querySelector(".navMob");

        navMob?.classList.toggle('openMenu');
      
    }

    return (
    <header>
        <div className="wrapheader">
            <div>
                <h1>Álbum Silvia y Roberto</h1>
            </div>
            <div>

                <button onClick={openNav} className="openNavMob">
                    <Image src="/menu.png" alt="menu" width={40} height={40} />
                </button>

                <nav className="navMob">
                    <ul>
                        <li>
                            <a href="/">Inicio</a>
                        </li>
                        {items.map((item) => (
                            <li key={item}>
                                <a href={`/${item.toLowerCase()}`}>{item}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <nav className="navDesk">
                    <ul>
                        <li>
                            <a href="/">Inicio</a>
                        </li>
                        {items.map((item) => (
                            <li key={item}>
                                <a href={`/${item.toLowerCase()}`}>{item}</a>
                            </li>
                        ))}
                    </ul>
                </nav>


            </div>
        </div>
    </header>
    );
}