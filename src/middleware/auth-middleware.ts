import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret, verify } from 'jsonwebtoken';
import { AuthToken, CustomError, UserRole } from '../types';
import env from 'env-var';
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const decodedToken = [req.headers.authorization]
			.map((authHeader) => extractToken(authHeader))
			.map((token) => verifyToken(token))
			.pop()!;

		const roles = decodedToken.a as UserRole[];
		const authToken: AuthToken = {
			email: decodedToken.e,
			id: decodedToken.sub!,
			expiresAt: decodedToken.exp!,
			roles: roles,
		};
		// Setting auth token in current response locals
		res.locals.auth = authToken;
		next();
	} catch (err: any) {
		const error: CustomError = {
			message: err.message,
			status: StatusCodes.UNAUTHORIZED,
		};
		next(error);
	}
};

const extractToken = (authHeader: string | undefined) => {
	if (!authHeader) {
		throw new Error('No bearer token found');
	}

	if (!authHeader.startsWith('Bearer ')) {
		throw new Error('Invalid token provided');
	}

	return authHeader.substring(7);
};

const verifyToken = (jwtToken: string) => {
	const secret: Secret = env.get('SECRET').required().asString();
	return verify(jwtToken, secret, { algorithms: ['HS256'], complete: true })
		.payload as JwtPayload;
};

export default authMiddleware;
