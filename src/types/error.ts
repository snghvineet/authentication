import { StatusCodes } from 'http-status-codes';

export default interface CustomError {
	message: string;
	status: StatusCodes;
}
