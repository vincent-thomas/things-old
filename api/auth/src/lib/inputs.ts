import { z } from "zod";

/**
 * @swagger
 * components:
 *   parameters:
 *     oauth-query:
 *       - in: query
 *         name: redirect_uri
 *         required: true
 *         type: string
 */
export const queryAuth = z.object({
  query: z.object({
    redirect_uri: z.string().url(),
    state: z.string().optional(),
    client_id: z.string(),
    scope: z.string().regex(/^(email|,name)*$/, 'Invalid scope'),
    response_type: z.string().regex(/code/).default('code'),
  }),
})
