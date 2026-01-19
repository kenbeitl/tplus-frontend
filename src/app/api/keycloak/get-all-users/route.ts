import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const GET = createKeycloakApiHandler({
  endpoint: '/api/admin/group/members',
  method: 'GET',
});
