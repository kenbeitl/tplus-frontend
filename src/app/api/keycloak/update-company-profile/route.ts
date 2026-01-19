import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const PUT = createKeycloakApiHandler({
  endpoint: '/api/admin/groups/update-attributes',
  method: 'PUT',
  validateBody: (body) => {
    const { id, name, attributes } = body;
    if (!id || !name) {
      return { valid: false, error: "Missing required fields: id, name" };
    }
    if (!attributes || typeof attributes !== 'object') {
      return { valid: false, error: "attributes must be an object" };
    }
    return { valid: true };
  },
});
