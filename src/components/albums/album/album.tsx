import React from "react";
import { Image } from "react-bootstrap";

import './album.css'

function Album({ id, photo, title, count }) {

    function goToAlbum() {
        let baseURL = new URL(window.location.href);
        baseURL.pathname = `/album/${id}`;
        baseURL.hash = '';
        baseURL.searchParams.set('title',title);

        window.location.assign(baseURL);
    }

    return (
        <div className="album bg-light text-dark rounded shadow overflow-hidden" onClick={goToAlbum}>
            <Image fluid src={`${photo}=w500-h500-c`}></Image>
            <div className="p-1">
                <h1>{title}</h1>
                <p>{count} photos</p>
            </div>
        </div>
    )
}

export default Album