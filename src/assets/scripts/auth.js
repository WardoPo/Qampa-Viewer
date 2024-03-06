import { config } from "../../config/oauth2";

function getGoogleAuthURL(redirect_path,immediate=false) {

    let authURL = new URL(config.auth_uri);

    let redirect_uri = new URL(window.location.href)
    redirect_uri.pathname = redirect_path
    redirect_uri.search = ''

    authURL.searchParams.set('client_id', config.client_id);
    authURL.searchParams.set('redirect_uri', redirect_uri.href)
    authURL.searchParams.set('response_type', 'token')
    authURL.searchParams.set('scope', config.scopes.join(' '))
    authURL.searchParams.set('immediate', immediate)

    return authURL

}

export default getGoogleAuthURL