import React, { useEffect, useState } from "react";
import { useMatch} from "react-router-dom";

import Photo from "./photo/photo.tsx";

function Photos() {

    const [getMediaItems, setGetMediaItems] = useState(true);
    const [mediaItems, setMediaItems] = useState([]);

    const albumID = useMatch('/album/:id')?.params.id;

    let albumTitle = (new URL(window.location.href))?.searchParams.get('title')

    const minimumAspectRatio = 5 / 1 /* 1348/323 */; //NOTE: Please review this aspect ratio shennanigans. That guys said it was supposed to be eaisier than maximum height

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

                // ▼ GRID ▼

                /* await new Promise((resolve)=>{setTimeout(resolve,5000)}) */

                let maxRowWidth = (document.getElementById('photoContainer')?.getBoundingClientRect().width);
                let currentRowAspectRatio = 0;
                let rowStartIndex = 0, rowEndIndex = 0

                console.log(maxRowWidth);

                newMediaItems.forEach((mediaItem, index) => {

                    let mediaItemAspectRatio = (mediaItem.mediaMetadata.width / mediaItem.mediaMetadata.height)
                    currentRowAspectRatio += mediaItemAspectRatio;

                    if (currentRowAspectRatio >= minimumAspectRatio) {

                        let maxHeight = maxRowWidth / currentRowAspectRatio;

                        rowEndIndex = index;

                        for (let m = rowStartIndex; m <= rowEndIndex; m++) {
                            newMediaItems[m].gridInfo = {
                                maxHeight: maxHeight,
                                aspect_ratio: newMediaItems[m].mediaMetadata.width / newMediaItems[m].mediaMetadata.height
                            }
                        }

                        rowStartIndex = index + 1

                        currentRowAspectRatio = 0;
                    }
                })

                // ▲ GRID ▲

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
        <>
        <h1 className="text-light mb-5">{albumTitle}</h1>
        <div id="photoContainer" className="min-vh-100 text-center">
            {mediaItems.map((mediaItem) => {
                return (
                    <Photo src={mediaItem.baseUrl} description={mediaItem.description} gridInfo={mediaItem.gridInfo} />
                )
            })}
        </div>
        </>
        
    )

}

export default Photos