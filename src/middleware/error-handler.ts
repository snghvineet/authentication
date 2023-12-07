import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../types';

const errorHandler = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(err.status).send(err);
};
export default errorHandler;
