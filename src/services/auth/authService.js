import createAuth0Client from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "../../store";

import config from "../../auth_config";

async function createClient() {
    let auth0client = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId,
    });

    return auth0client;
}

async function loginWithPopup(client, options) {
    popupOpen.set(true);

    try {
        await client.loginWithPopup(options);

        user.set(await client.getUser());
        isAuthenticated.set(true);
    } catch (error) {
        console.log(error);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client) {
    return client.logout();
}

const auth = {
    loginWithPopup,
    logout,
    createClient
}

export default auth;