import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

const validateRequestBody =
	(schema: ZodSchema<any>) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof z.ZodError) {
				res.status(400).json({
					status: "error",
					errors: error,
				});
			} else {
				next(error);
			}
		}
	};

export { validateRequestBody };
