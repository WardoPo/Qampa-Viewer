import React, { createContext, useState } from "react"

import { AlbumContext } from "../assets/scripts/contexts/album_context.jsx";

import Photos from "../components/photos/photos.tsx"
import SideBar from "../components/sidebar/sidebar.tsx"
import MediaDisplay from "../components/mediadisplay/mediadisplay.tsx";

function AlbumPage() {

    localStorage.setItem('mediaItems_nextPageToken', "");

    const [albumContext, setAlbumContext] = useState({ mediaItems: [], index: 0 })
    let albumContextValue = {mediaDisplayInfo:albumContext,updateAlbumContext:setAlbumContext}

    return (
        <main className="bg-dark">
            <AlbumContext.Provider value={albumContextValue}>
                <MediaDisplay></MediaDisplay>
                <SideBar />
                <div className="p-5">
                    <Photos />
                </div>
            </AlbumContext.Provider>
        </main>
    )
}

export default AlbumPage