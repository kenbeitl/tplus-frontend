import { createKeycloakApiHandler } from '../../keycloakApiHandler';

export const PUT = createKeycloakApiHandler({
  method: 'PUT',
  keycloakEndpoint: (req, { params }) => `/api/admin/users/disable/${params.userId}`,
});
