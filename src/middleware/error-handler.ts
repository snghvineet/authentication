import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../types';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(err.status ?? StatusCodes.INTERNAL_SERVER_ERROR).send(err);
};
export default errorHandler;
