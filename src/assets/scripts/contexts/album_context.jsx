import { createContext } from "react"

export const AlbumContext = createContext({ mediaDisplayInfo: { mediaItems: [], index: 0, active: false }, updateAlbumContext: () => { } })