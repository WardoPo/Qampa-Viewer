import React, { useContext, useEffect, useState } from "react";
import { useMatch } from "react-router-dom";

import { AlbumContext } from "../../assets/scripts/contexts/album_context.jsx";

import Photo from "./photo/photo.tsx";

import getGoogleAuthURL from "../../assets/scripts/auth.js";


function Photos() {

    const [getMediaItems, setGetMediaItems] = useState(true);
    const [mediaItems, setMediaItems] = useState([]);

    const albumContext = useContext(AlbumContext);

    const albumID = useMatch('/album/:id')?.params.id;

    let albumTitle = (new URL(window.location.href))?.searchParams.get('title')

    function calculateGrid(newMediaItems) {
        const minimumAspectRatio = 5 / 1 /* 1348/323 */; //NOTE: Please review this aspect ratio shennanigans. That guys said it was supposed to be eaisier than maximum height

        // ▼ GRID ▼

        /* await new Promise((resolve)=>{setTimeout(resolve,5000)}) */

        let maxRowWidth = (document.getElementById('photoContainer')?.getBoundingClientRect().width);
        let currentRowAspectRatio = 0;
        let rowStartIndex = 0, rowEndIndex = 0

        console.log(maxRowWidth);

        newMediaItems.forEach((mediaItem, index) => {

            let mediaItemAspectRatio = (mediaItem.mediaMetadata.width / mediaItem.mediaMetadata.height)
            currentRowAspectRatio += mediaItemAspectRatio;

            if (currentRowAspectRatio >= minimumAspectRatio || index == newMediaItems.length - 1) {

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

        return newMediaItems
    }

    useEffect(() => {

        async function fecthMediaItems() {

            if (localStorage.getItem("mediaItems_nextPageToken") == "end") {
                console.log("End of Content Reached ~ !")
                return;
            }

            console.log("Fetching Media Items ...")

            let mediaItemsURL = new URL('https://photoslibrary.googleapis.com/v1/mediaItems:search')

            let requestBody = {
                pageSize: "100",
                albumId: albumID
            }

            if (localStorage.getItem('mediaItems_nextPageToken')) {
                requestBody.pageToken = localStorage.getItem("mediaItems_nextPageToken");
            }

            let response: Response | null = null

            response = await fetch(mediaItemsURL, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('google_access_token')
                },
                body: JSON.stringify(requestBody)
            })

            switch (response.status) {
                case 200:
                    let responseBody = await response.json()
                    let newMediaItems = responseBody.mediaItems ?? [];

                    localStorage.setItem('mediaItems_nextPageToken', responseBody.nextPageToken ?? "end");
                    newMediaItems = calculateGrid(newMediaItems);
                    setMediaItems([...mediaItems, ...newMediaItems]);
                    break;
                case 401:
                    window.location.assign(getGoogleAuthURL(window.location.pathname, true))
                    break;
                default:
                    console.error(response)
            }

        }

        if (getMediaItems) {
            fecthMediaItems();
            setGetMediaItems(false);
        }

        if (JSON.stringify(albumContext.mediaDisplayInfo.mediaItems) != JSON.stringify(mediaItems)) {
            albumContext.updateAlbumContext({ mediaItems: mediaItems, index: albumContext.mediaDisplayInfo.index, active: albumContext.mediaDisplayInfo.active });
        }

    })

    window.onscrollend = () => {

        if (document.getElementById('photoContainer')?.lastElementChild?.getBoundingClientRect().top <= window.innerHeight && !getMediaItems) {
            setGetMediaItems(true);
        }

    }

    function startMediaDisplay(index = 0) {
        albumContext.updateAlbumContext({ mediaItems: albumContext.mediaDisplayInfo.mediaItems, index: index, active: true })
    }

    return (
        <>
            <div className="d-flex justify-content-between text-light mb-5">
                <h1>{albumTitle}</h1>
                <span className="material-symbols-outlined" onClick={() => startMediaDisplay()}>
                    play_arrow
                </span>
            </div>
            <div id="photoContainer" className="min-vh-100 text-center">
                {mediaItems.map((mediaItem,index) => {
                    return (
                        <Photo src={mediaItem.baseUrl} description={mediaItem.description} gridInfo={mediaItem.gridInfo} key={mediaItem.id} onClick={()=>{startMediaDisplay(index)}}/>
                    )
                })}
            </div>
        </>

    )

}

export default Photos