import { z } from "zod";
import { UserSchema } from "./user-type";
export const PostSchema = z.object({
	id: z.number().int().nonnegative(),
	title: z.string(),
	content: z.string().optional(),
	published: z.boolean().default(false),
	author: UserSchema.optional(),
	authoId: z.string().uuid(),
});
export const PostUpdateSchema = z.object({
	title: z.string().optional(),
	content: z.string().optional(),
	published: z.boolean().optional(),
	author: UserSchema.optional(),
});
export type PostType = z.infer<typeof UserSchema>;
