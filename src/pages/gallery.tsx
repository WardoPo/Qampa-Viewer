import React, { useEffect } from "react";
import Albums from "../components/albums/albums.tsx";
import { Container } from "react-bootstrap";
import SideBar from "../components/sidebar/sidebar.tsx";

function GalleryPage() {

    let googleResponse = {}
    window.location.hash.slice(1).split("&").forEach((parameter) => {
        let [name, ...rest] = parameter.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        googleResponse[name] = decodeURIComponent(value);
    })

    googleResponse.access_token && localStorage.setItem('google_access_token', googleResponse.access_token);
    localStorage.setItem('albums_nextPageToken', "");

    useEffect(() => {
        // ▼ Gather & Store Info ▼

        async function fetchUserInfo() {

            let userInfoURL = new URL('https://www.googleapis.com/oauth2/v1/userinfo')
            userInfoURL.searchParams.set('alt', 'json')

            let response = await fetch(userInfoURL, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('google_access_token')
                }
            })
            if (response.status == 200) {
                let responseBody = await response.json()

                localStorage.setItem('userInfo', JSON.stringify(responseBody));

            } else {
                console.log(response);
            }

        }

        if (!localStorage.getItem('userInfo')) {
            fetchUserInfo()
        }

        // ▲ Gather & Store Info ▲
    })

    return (
        <main className="bg-dark min-vh-100">
            <SideBar></SideBar>
            <div className="p-5">
                <Albums />
            </div>
        </main>
    )
}

export default GalleryPage