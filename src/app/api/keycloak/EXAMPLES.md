# Keycloak API Handler Examples

The `keycloakApiHandler` utility simplifies creating secure API routes that proxy to your backend.

## Basic Usage

### Simple POST Request (No Body Validation)
```typescript
// app/api/keycloak/refresh-token/route.ts
import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const POST = createKeycloakApiHandler({
  endpoint: '/api/auth/refresh',
  method: 'POST',
});
```

### GET Request
```typescript
// app/api/keycloak/user-details/route.ts
import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const GET = createKeycloakApiHandler({
  endpoint: '/api/general/users/profile',
  method: 'GET',
});
```

### PUT/POST with Body Validation
```typescript
// app/api/keycloak/update-email/route.ts
import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const PUT = createKeycloakApiHandler({
  endpoint: '/api/general/users/update-email',
  method: 'PUT',
  validateBody: (body) => {
    if (!body.newEmail || !body.newEmail.includes('@')) {
      return { valid: false, error: "Valid email is required" };
    }
    return { valid: true };
  },
});
```

### With Body Transformation
```typescript
// app/api/keycloak/upload-document/route.ts
import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const POST = createKeycloakApiHandler({
  endpoint: '/api/documents/upload',
  method: 'POST',
  validateBody: (body) => {
    if (!body.file || !body.documentType) {
      return { valid: false, error: "File and documentType are required" };
    }
    return { valid: true };
  },
  transformBody: (body) => {
    // Transform the body before sending to backend
    return {
      ...body,
      uploadedAt: new Date().toISOString(),
      userId: body.userId || 'unknown',
    };
  },
});
```

### Complex Validation
```typescript
// app/api/keycloak/create-application/route.ts
import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const POST = createKeycloakApiHandler({
  endpoint: '/api/applications/create',
  method: 'POST',
  validateBody: (body) => {
    const required = ['applicationName', 'applicationType', 'description'];
    const missing = required.filter(field => !body[field]);
    
    if (missing.length > 0) {
      return { 
        valid: false, 
        error: `Missing required fields: ${missing.join(', ')}` 
      };
    }
    
    if (body.applicationType && !['web', 'mobile', 'desktop'].includes(body.applicationType)) {
      return { 
        valid: false, 
        error: "applicationType must be 'web', 'mobile', or 'desktop'" 
      };
    }
    
    return { valid: true };
  },
});
```

### DELETE Request
```typescript
// app/api/keycloak/delete-account/route.ts
import { createKeycloakApiHandler } from "../keycloakApiHandler";

export const DELETE = createKeycloakApiHandler({
  endpoint: '/api/general/users/delete-account',
  method: 'DELETE',
});
```

## Benefits

1. **5 lines instead of 50+**: Each route is now ~5 lines instead of 50+ lines
2. **Automatic session validation**: No need to repeat auth checks
3. **Consistent error handling**: All errors formatted the same way
4. **Type-safe**: Full TypeScript support
5. **Easy to test**: Validation logic is separated and testable
6. **Maintainable**: Changes to auth flow only need to be made once

## What the Handler Does Automatically

- ✅ Validates session using `getServerSession`
- ✅ Checks for `accessToken` presence
- ✅ Parses request body (for non-GET requests)
- ✅ Validates request body (if validator provided)
- ✅ Transforms request body (if transformer provided)
- ✅ Adds Authorization Bearer token
- ✅ Sets proper headers
- ✅ Handles axios errors consistently
- ✅ Returns properly formatted JSON responses
- ✅ Logs errors with endpoint context

## Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `endpoint` | string | ✅ | Backend API endpoint (e.g., '/api/users/profile') |
| `method` | 'GET' \| 'POST' \| 'PUT' \| 'DELETE' \| 'PATCH' | ✅ | HTTP method |
| `validateBody` | function | ❌ | Function to validate request body. Return `{valid: boolean, error?: string}` |
| `transformBody` | function | ❌ | Function to transform body before sending to backend |

## Adding Your 10 New Routes

Each new route is now just:
1. Create a new file: `app/api/keycloak/[route-name]/route.ts`
2. Import the handler
3. Export with config (5 lines)

That's it! No more repetitive session checks, error handling, or axios setup.
