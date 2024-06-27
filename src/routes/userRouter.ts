import express from "express";
import userController from "../controllers/user_controller";
import { validateRequestBody } from "../middlewares/userValidationMiddlewares";
import { UserSchema, UserUpdateSchema } from "../Schema/user-type";
const router = express.Router();
router
	.route("/signup")
	.post(validateRequestBody(UserSchema), userController.insertUser);
router.route("/:id").get(userController.readUser).patch(validateRequestBody(UserUpdateSchema),userController.updateUser);
const userRouter = router;
export default userRouter;
