import React from "react";
import { Image, NavLink, Navbar } from "react-bootstrap";

import './sidebar.css'

function SideBar() {
    
    function goToAlbums(){
        let albumsURL = new URL(window.location.href)
        albumsURL.pathname = "/gallery"

        console.log("Why no work?")

        window.location.assign(albumsURL);
    }

    function logout(){
        let baseURL = new URL(window.location.href);
        baseURL.pathname = '';
        window.location.assign(baseURL)
        
        localStorage.clear()
    }

    return (
        <div className="sidebar d-flex flex-column justify-content-between bg-dark text-light vh-100 px-1 py-5">
            <Image fluid roundedCircle src={JSON.parse(localStorage.getItem('userInfo'))?.picture} className="object-fit-contain"></Image>
            <div className="menu-container">
                <div className="menu-option py-2" onClick={goToAlbums} tabIndex={0}>
                    <div className="icon-container text-center">
                        <span className="material-symbols-outlined">
                            photo_album
                        </span>
                    </div>

                    <span className="ms-3">Álbumes</span>
                </div>
            </div>
            <div className="menu-container text-danger">
                <div className="menu-option py-2" onClick={logout} tabIndex={0}>
                    <div className="icon-container text-center">
                        <span className="material-symbols-outlined">
                            logout
                        </span>
                    </div>

                    <span className="ms-3">Cerrar Sesión</span>
                </div>

            </div>
        </div>
    )
}

export default SideBar