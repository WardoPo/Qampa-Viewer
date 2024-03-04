import React from "react";
import Albums from "../components/albums/albums.tsx";
import { Container } from "react-bootstrap";

function GalleryPage() {

    let googleResponse = {}
    window.location.hash.slice(1).split("&").forEach((parameter) => {
        let [name, ...rest] = parameter.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        googleResponse[name] = decodeURIComponent(value);
    })

    localStorage.setItem('google_access_token', googleResponse.access_token);
    localStorage.setItem('albums_nextPageToken',"");

    return (
        <div className="bg-dark">
            <Container fluid className="p-5 mh-100 overflow-hidden">
                <Albums/>
            </Container>
        </div>
    )
}

export default GalleryPage