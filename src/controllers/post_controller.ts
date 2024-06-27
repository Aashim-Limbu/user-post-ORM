import { Prisma, PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { PostSchema } from "../Schema/post-schema";
import { ResponseStatus } from "../utils/ResponseType";
const prisma = new PrismaClient();
export const getAllPosts: RequestHandler = async (req, res, next) => {
	try {
		const posts = await prisma.post.findMany();
		res.status(200).json({
			status: "success",
			data: posts,
		});
	} catch (error) {
		next(error);
	}
};
export const getPost: RequestHandler = async (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	try {
		const post = await prisma.post.findUnique({
			where: {
				id,
			},
		});
		if (!post) return next(`Sorry the post with ${id} not found`);
		res.status(200).json({
			status: "success",
			data: post,
		});
	} catch (error) {
		next(`Sorry Post Not Found`);
	}
};
export const createPost: RequestHandler = async (req, res, next) => {
	const id = parseInt(req.params.id);
	try {
		const post = prisma.post.create({
			data: req.body,
			select: {
				id: true,
			},
		});
		if (!post) return next("Sorry cannot create a post");
		res.status(ResponseStatus.Created).json({
			status: "success",
			data: post,
		});
	} catch (error) {
		next("Sorry failed to create post");
	}
};
export const updatePost: RequestHandler = async (req, res, next) => {
	const id = parseInt(req.params.id);
	try {
		const post = prisma.post.update({
			where: {
				id,
			},
			data: req.body,
		});
        if(!post) return 
	} catch (error) {
        next('sorry cannot update the post')
    }
};
