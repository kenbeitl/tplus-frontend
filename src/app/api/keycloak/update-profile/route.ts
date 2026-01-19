import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const PUT = createKeycloakApiHandler({
  endpoint: '/api/general/users/update-user-profile',
  method: 'PUT',
  validateBody: (body) => {
    const { email, firstName, lastName } = body;
    if (!email || !firstName || !lastName) {
      return { valid: false, error: "Missing required fields: email, firstName, lastName" };
    }
    return { valid: true };
  },
});
