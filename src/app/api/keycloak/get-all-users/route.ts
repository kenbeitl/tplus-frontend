import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const GET = createKeycloakApiHandler({
  endpoint: '/api/admin/groups/members',
  method: 'GET',
});
