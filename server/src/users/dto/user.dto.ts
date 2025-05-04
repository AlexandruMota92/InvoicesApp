import { z } from 'zod';

export const User = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

// extract the inferred type
export type User = z.infer<typeof User>;
