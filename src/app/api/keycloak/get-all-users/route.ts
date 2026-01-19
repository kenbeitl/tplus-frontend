import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const GET = createKeycloakApiHandler({
  endpoint: '/api/keycloak/refresh-user',
  method: 'GET',
});
