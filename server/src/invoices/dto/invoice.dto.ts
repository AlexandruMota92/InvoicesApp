import { z } from 'zod';

export const Invoice = z.object({
  id: z.number(),
  vendor_name: z.string(),
  amount: z.number(),
  due_date: z.date(),
  description: z.string(),
  user_id: z.number(),
  paid: z.boolean(),
});

// extract the inferred type
export type Invoice = z.infer<typeof Invoice>;
