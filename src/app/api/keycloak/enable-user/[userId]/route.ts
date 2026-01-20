import { createKeycloakApiHandler } from '../../keycloakApiHandler';

export const PUT = createKeycloakApiHandler({
  method: 'PUT',
  keycloakEndpoint: (req, { params }) => `/api/admin/users/enable/${params.userId}`,
});
