import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";

import { AlbumContext } from "../../assets/scripts/contexts/album_context";

import './mediadisplay.css'

function MediaDisplay() {

    const [displayInterval, setDisplayInterval] = useState<NodeJS.Timeout | null>(null);
    let albumContext = useContext(AlbumContext)

    function switchImages() {

        let currentMediaItem = document.getElementById('currentMediaItem')
        let followingMediaItem = document.getElementById('followingMediaItem')

        currentMediaItem?.classList.remove("current");
        //TODO:MAKE Element Invisible when it has no following class;
        followingMediaItem?.classList.remove("following");

        if(albumContext.mediaDisplayInfo.index > albumContext.mediaDisplayInfo.mediaItems.length){
            albumContext.updateAlbumContext({ mediaItems: albumContext.mediaDisplayInfo.mediaItems, index: 0 });
        }else{
            albumContext.updateAlbumContext({ mediaItems: albumContext.mediaDisplayInfo.mediaItems, index: albumContext.mediaDisplayInfo.index + 1 });
        }

        //HACK:
        currentMediaItem?.getBoundingClientRect()
        followingMediaItem?.getBoundingClientRect()

        currentMediaItem?.classList.add("current");
        followingMediaItem?.classList.add("following");

        //TODO: Scroll background album to have the picture in focus and on the top line.
    }

    return (
        <div className="display active">
            <Image src={albumContext.mediaDisplayInfo.mediaItems[albumContext.mediaDisplayInfo.index]?.baseUrl ?? ""} id="currentMediaItem" className="current"></Image>
            <Image src={albumContext.mediaDisplayInfo.mediaItems[albumContext.mediaDisplayInfo.index + 1]?.baseUrl ?? ""} id="followingMediaItem" className="following" onAnimationEnd={switchImages}></Image>
        </div>
    )
}

export default MediaDisplay