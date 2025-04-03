// config/keycloak.ts
import Keycloak from "keycloak-js";

const url = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;

if (!url || !realm || !clientId) {
  throw new Error("Keycloak environment variables are not set");
}

const keycloak = new Keycloak({
  url,
  realm,
  clientId,
});

let keycloakInitPromise: Promise<Keycloak.KeycloakInstance> | null = null;

export const initKeycloak = async (): Promise<Keycloak.KeycloakInstance> => {
  // ✅ Already initialized
  if (keycloakInitPromise) return keycloak;

  // ✅ Create once and reuse
  keycloakInitPromise = keycloak.init({
    onLoad: "login-required",
  }).then(() => keycloak);

  return keycloakInitPromise;
};

export default keycloak;
