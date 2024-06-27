import { z } from "zod";

const UserSchema = z.object({
	id: z.string().uuid().optional(),
	email: z.string().email(),
	name: z.string().optional(),
	posts: z.array(z.object({})).optional(),
});
const UserUpdateSchema = z.object({
	email: z.string().email().optional(),
	name: z.string().optional(),
});
type User = z.infer<typeof UserSchema>;
type UserUpdate = z.infer<typeof UserUpdateSchema>;
export { UserSchema, User, UserUpdateSchema, UserUpdate };
