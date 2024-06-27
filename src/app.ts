import express, { Handler, NextFunction, Request, Response } from "express";
import userRouter from "./routes/userRouter";
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRouter);
const unHandledRouteHandler: Handler = (req, res, next) => {
	res.status(404).json({
		status: "404 Not Found",
		message: `${req.originalUrl} path have not been specified`,
	});
};
app.use("*", unHandledRouteHandler);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	res.status(err.statusCode || 500).json({
		status: "error",
		error: err,
	});
});
export default app;
