import express from "express";
import * as userController from "../controllers/user_controller";
import { validateRequestBody } from "../middlewares/userValidationMiddlewares";
import { UserSchema, UserUpdateSchema } from "../Schema/user-type";
const router = express.Router();
router
	.route("/")
	.post(validateRequestBody(UserSchema), userController.insertUser)
	.get(userController.getAllUser);
router
	.route("/:id")
	.get(userController.readUser)
	.patch(validateRequestBody(UserUpdateSchema), userController.updateUser)
	.delete(userController.deleteUser);
const userRouter = router;
export default userRouter;
