import React from "react";
import { Image } from "react-bootstrap";

import './photo.css'

function Photo({ src, description = "", gridInfo = {}, onClick = undefined , onKeyDown = undefined }) {

    let maxRoundedHeight = isNaN(Math.round(gridInfo.maxHeight)) ? "500" : Math.round(gridInfo.maxHeight)

    return (
        <div className="d-inline-block p-1" style={{ maxHeight: Math.floor(gridInfo.maxHeight), aspectRatio: gridInfo.aspect_ratio }} onClick={onClick} onKeyDown={onKeyDown} tabIndex={0}>
            <Image src={`${src}=w2048-h${maxRoundedHeight}`} className="mediaItem object-fit-cover mw-100"></Image>
        </div>
    )
}

export default Photo