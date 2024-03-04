import React from "react"
import { Container } from "react-bootstrap"

import Photos from "../components/photos/photos.tsx"

function AlbumPage() {
    return (
        <div className="bg-dark">
        <Container fluid className="p-5">
            <Photos/>
        </Container>
    </div>
    )
}

export default AlbumPage