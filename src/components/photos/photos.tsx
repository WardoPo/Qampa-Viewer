import React, { useEffect, useState } from "react";
import { useMatch, useMatches } from "react-router-dom";

import Photo from "./photo/photo.tsx";

function Photos(props) {

    const [getMediaItems, setGetMediaItems] = useState(true);
    const [mediaItems, setMediaItems] = useState([]);

    const albumID = useMatch('/album/:id')?.params.id;

    useEffect(() => {

        async function fecthMediaItems() {

            console.log("Fetching Media Items ...")

            let mediaItemsURL = new URL('https://photoslibrary.googleapis.com/v1/mediaItems:search')

            let requestBody = {
                pageSize: "100",
                albumId: albumID
            }

            let response: Response | null = null

            response = await fetch(mediaItemsURL, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('google_access_token')
                },
                body: JSON.stringify(requestBody)
            })

            if (response.status == 200) {
                let responseBody = await response.json()
                let newMediaItems = responseBody.mediaItems ?? [];

                localStorage.setItem('mediaItems_nextPageToken', responseBody.nextPageToken ?? "");

                setMediaItems([...mediaItems, ...newMediaItems]);
            } else {
                console.log(response);
            }

        }

        if (getMediaItems) {
            fecthMediaItems();
            setGetMediaItems(false);
        }

    })

    return (
        <div>
            {mediaItems.map((mediaItem) => {
                return (
                    <Photo src={mediaItem.baseUrl} description={mediaItem.description} metadata={mediaItem.mediaMetadata} />
                )
            })}
        </div>
    )

}

export default Photos