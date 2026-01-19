import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const POST = createKeycloakApiHandler({
  endpoint: '/api/general/users/change-password',
  method: 'POST',
});
