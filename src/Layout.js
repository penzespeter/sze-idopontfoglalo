import { Outlet, Link, NavLink } from "react-router-dom";
import Icon from './calendar_icon.png';

export default function Layout({logout, loggedIn}) {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={Icon} width="40px" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" aria-current="page" to="/">Oktatók</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" aria-current="page" to="/calendar">Időpontjaim</NavLink>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {
                                    !loggedIn ?
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">Belépés</Link>
                                        </li>
                                        :
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-user me-2"></i>Belépett Felhasználó
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a className="dropdown-item" href="/" onClick={logout}>Kilépés</a></li>
                                            </ul>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="mt-5 d-flex justify-contetn-center container">
                <Outlet />
            </div>
        </>
    )
};