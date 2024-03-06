import React from "react";

import { Button } from "react-bootstrap";

import { config } from "../config/oauth2";
import getGoogleAuthURL from "../assets/scripts/auth";

function googleAuth() {

    window.location.assign(getGoogleAuthURL('gallery'));

}

function LoginWithGoogle() {
    return (
        <Button onClick={googleAuth}> Login with Google </Button>
    )
}

export default LoginWithGoogle