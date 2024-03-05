import React from "react"

import Photos from "../components/photos/photos.tsx"
import SideBar from "../components/sidebar/sidebar.tsx"

function AlbumPage() {
    return (
        <main className="bg-dark">
            <SideBar></SideBar>
            <div className="p-5">
                <Photos />
            </div>
        </main> 
    )
}

export default AlbumPage