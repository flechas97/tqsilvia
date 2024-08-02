'use client'
export default function Header() {
    const items = ["Inicio", "Lugares", "Eventos"];

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

                <button onClick={openNav} className="openNavMob">Menu</button>
                <nav className="navMob">
                    <ul>
                        {items.map((item) => (
                            <li key={item}>
                                <a href={`/${item.toLowerCase()}`}>{item}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <nav className="navDesk">
                    <ul>
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