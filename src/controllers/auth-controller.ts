import { NextFunction, Request, Response } from 'express';
import { AuthRequest, AuthResponse, CustomError } from '../types';
import { authService } from '../services';
import { StatusCodes } from 'http-status-codes';

function login(req: Request, res: Response, next: NextFunction) {
	const userCredentials = req.body as AuthRequest;
	try {
		const accessToken = authService.attemptLoginWithEmailAndPassword(
			userCredentials.email,
			userCredentials.password
		);
		const authResponse: AuthResponse = { accessToken };
		res.send(authResponse);
	} catch (err: any) {
		const error: CustomError = {
			message: err.message,
			status: StatusCodes.UNAUTHORIZED,
		};
		next(error);
	}
}

export default { login };
