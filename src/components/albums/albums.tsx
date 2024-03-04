import React, { useEffect, useState } from "react";

import { Col, Row } from "react-bootstrap";

import Album from "./album/album.tsx";

function Albums() {

    const [getAlbums, setGetAlbums] = useState(true);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {

        async function fetchAlbums() {

            console.log("Fetching Albums...")

            let albumsURL = new URL('https://photoslibrary.googleapis.com/v1/albums')

            if (localStorage.getItem('albums_nextPageToken')) {
                albumsURL.searchParams.set('pageToken', localStorage.getItem("albums_nextPageToken"));
            }

            let response: Response | null = null;

            response = await fetch(albumsURL, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('google_access_token')
                }
            })

            if (response.status == 200) {
                let responseBody = await response.json()
                let newAlbums = responseBody.albums ?? [];

                localStorage.setItem('albums_nextPageToken', responseBody.nextPageToken ?? "");

                setAlbums([...albums, ...newAlbums]);
            } else {
                console.log(response);
            }

        }

        if (getAlbums) {
            fetchAlbums();
            setGetAlbums(false);
        }
    })

    window.onscrollend = () =>{

        if(document.getElementById('albumContainer')?.lastElementChild?.getBoundingClientRect().top <= window.innerHeight && !getAlbums){
            setGetAlbums(true);
        }

    }

    return (
        <>
            <Row lg={6} className="g-5" id="albumContainer">
                {albums && albums.map((album) => {
                    return (
                        <Col>
                            <Album photo={album.coverPhotoBaseUrl} title={album.title} count={album.mediaItemsCount} />
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default Albums