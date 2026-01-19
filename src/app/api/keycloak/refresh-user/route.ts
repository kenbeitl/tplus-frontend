import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const GET = createKeycloakApiHandler({
  endpoint: '/api/general/users/profile',
  method: 'GET',
});
