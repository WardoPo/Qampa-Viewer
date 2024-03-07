import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";

import { AlbumContext } from "../../assets/scripts/contexts/album_context";

import './mediadisplay.css'

function MediaDisplay() {

    const avaliableHeight = window.innerHeight
    const albumContext = useContext(AlbumContext)

    function switchImages() {

        let currentMediaItem = document.getElementById('currentMediaItem')
        let followingMediaItem = document.getElementById('followingMediaItem')

        currentMediaItem?.classList.add("d-none");
        currentMediaItem?.classList.remove("current");

        followingMediaItem?.classList.remove("following");

        //HACK:
        currentMediaItem?.getBoundingClientRect()
        followingMediaItem?.getBoundingClientRect()

        if (albumContext.mediaDisplayInfo.index > albumContext.mediaDisplayInfo.mediaItems.length) {
            albumContext.updateAlbumContext({ mediaItems: albumContext.mediaDisplayInfo.mediaItems, index: 0, active: albumContext.mediaDisplayInfo.active });
        } else {
            albumContext.updateAlbumContext({ mediaItems: albumContext.mediaDisplayInfo.mediaItems, index: albumContext.mediaDisplayInfo.index + 1, active: albumContext.mediaDisplayInfo.active });
        }

        followingMediaItem?.classList.add("following");

        currentMediaItem?.classList.remove("d-none");
        currentMediaItem?.classList.add("current");

        //TODO: Scroll background album to have the picture in focus and on the top line.
    }

    function stopMediaDisplay() {
        albumContext.updateAlbumContext({ mediaItems: albumContext.mediaDisplayInfo.mediaItems, index: albumContext.mediaDisplayInfo.index, active: false })
    }

    return (
        <div className={`display ${albumContext.mediaDisplayInfo.active && "active"}`} id="mediaItemDisplay">
            <div className="text-light m-5 close-icon">
                <span className="material-symbols-outlined" onClick={stopMediaDisplay} onKeyDown={stopMediaDisplay} tabIndex={1}>
                    close
                </span>
            </div>

            <Image src={`${albumContext.mediaDisplayInfo.mediaItems[albumContext.mediaDisplayInfo.index]?.baseUrl}=w2048-h${avaliableHeight}` ?? ""} id="currentMediaItem" className="current"></Image>
            <Image src={`${albumContext.mediaDisplayInfo.mediaItems[albumContext.mediaDisplayInfo.index + 1]?.baseUrl}=w2048-h${avaliableHeight}` ?? ""} id="followingMediaItem" className="following" onAnimationEnd={switchImages}></Image>
        </div>
    )
}

export default MediaDisplay