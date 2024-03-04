import React from "react";
import { Image } from "react-bootstrap";

function Photo({src,description="",metadata}){

    const lineHeight = 343;

    return(
        <span>
            <Image src={`${src}=w2048-h${lineHeight}`}></Image>
        </span>
    )
}

export default Photo