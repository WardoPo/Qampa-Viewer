import React from "react";
import { Image } from "react-bootstrap";

import './album.css'

function Album({ photo, title, count }) {
    return (
        <div className="album bg-light text-dark rounded shadow overflow-hidden">
            <Image fluid src={`${photo}=w500-h500-c`}></Image>
            <div className="p-1">
                <h1>{title}</h1>
                <p>{count} photos</p>
            </div>
        </div>
    )
}

export default Album