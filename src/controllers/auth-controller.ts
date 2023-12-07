import { NextFunction, Request, Response } from 'express';
import { AuthRequest, AuthResponse, CustomError, UserDetail } from '../types';
import { authService } from '../services';
import { StatusCodes } from 'http-status-codes';
import { send } from 'process';
import expressAsyncHandler from 'express-async-handler';

async function login(req: Request, res: Response, next: NextFunction) {
	const userCredentials = req.body as AuthRequest;
	try {
		const accessToken = await authService.attemptLoginWithEmailAndPassword(
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

async function signup(req: Request, res: Response, next: NextFunction) {
	const userCredentials = req.body as AuthRequest;
	try {
		const data = await authService.createAccount(
			userCredentials.email,
			userCredentials.password
		);
		if (!data) throw Error('Not created');
		res.send({
			id: data.id,
			email: data.email,
		});
	} catch (err: any) {
		if (err.constraint === 'users_email_key') {
			next({
				message: 'An account is already registered with this email',
				status: StatusCodes.CONFLICT,
			} as CustomError);
		}
		throw Error(err.message);
	}
}

export default {
	login: expressAsyncHandler(login),
	signup: expressAsyncHandler(signup),
};
