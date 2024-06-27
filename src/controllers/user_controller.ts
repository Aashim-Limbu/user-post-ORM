import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
const prisma = new PrismaClient();
const insertUser: RequestHandler = async (req, res, next) => {
	try {
		const user = await prisma.user.create({
			data: req.body,
			select: {
				id: true,
			},
		});
		console.log("User created Successfully");
		res.status(200).json({
			status: "success",
			data: user,
		});
	} catch (error) {
		next(error);
	}
};
const readUser: RequestHandler = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});
		if (!user) {
			return next("Sorry user don't exists in our database");
		}
		res.status(200).json({
			status: "success",
			data: user,
		});
	} catch (error) {
		next("Sorry cannot find the user");
	}
};
const updateUser: RequestHandler = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await prisma.user.update({
			where: {
				id,
			},
			data: req.body,
		});
		console.log("updated the user successfully");
		res.status(201).json({
			status: "success",
			data: user,
		});
	} catch (error) {
		next(`Sorry can't update the user ${error}`);
	}
};
const deleteUser: RequestHandler = async (req, res, next) => {
	const id = req.params.id;
	try {
		const user = await prisma.user.delete({
			where: {
				id,
			},
		});
		if (!user) {
			next("Sorry User Not Found");
		}
		return res.status(204).json({
			status: "Success",
			data: user,
		});
	} catch (error) {
		next(`Sorry Unable to delete the user with id ${id}`);
	}
};
const userController = {
	insertUser,
	readUser,
	updateUser,
	deleteUser,
};
export default userController;
