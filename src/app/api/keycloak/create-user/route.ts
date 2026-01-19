import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const POST = createKeycloakApiHandler({
  endpoint: '/api/admin/users/create-user',
  method: 'POST',
});
