import { z } from "zod";

export const loginType = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export type LoginFormData = z.infer<typeof loginType>;
