import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
const prisma = new PrismaClient();
export const insertUser: RequestHandler = async (req, res, next) => {
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
export const readUser: RequestHandler = async (req, res, next) => {
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
export const getAllUser: RequestHandler = async (req, res, next) => {
	try {
		const users = await prisma.user.findMany();
		if (!users) return next("User failed to load");
		res.status(200).json({
			status: "success",
			data: users,
		});
	} catch (error) {
		next("Sorry cannot get the user");
	}
};
export const updateUser: RequestHandler = async (req, res, next) => {
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
export const deleteUser: RequestHandler = async (req, res, next) => {
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
