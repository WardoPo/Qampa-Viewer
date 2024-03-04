import React from "react";

import { Button } from "react-bootstrap";

import { config } from "../config/oauth2";

function googleAuth() {

    let authURL = new URL(config.auth_uri);
    authURL.searchParams.set('client_id', config.client_id);
    authURL.searchParams.set('redirect_uri', `${window.location.href}gallery`)
    authURL.searchParams.set('response_type', 'token')
    authURL.searchParams.set('scope', config.scopes.join(' '))

    window.location.assign(authURL);

}

function LoginWithGoogle() {
    return (
        <Button onClick={googleAuth}> Login with Google </Button>
    )
}

export default LoginWithGoogle