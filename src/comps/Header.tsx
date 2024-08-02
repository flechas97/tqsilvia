export default function Header() {
    const items = ["Inicio", "Lugares", "Eventos"];

    return (
    <header>
        <div className="wrapheader">
            <div>
                <h1>Álbum de recuerdos Silvia y Roberto</h1>
            </div>
            <div>
                <nav>
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