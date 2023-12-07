import { AuthToken } from './src/types';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number;
			SECRET: string;
			SALT_NUMBER: number | undefined;
		}
	}
	namespace Express {
		interface Locals {
			auth: AuthToken | undefined;
		}
	}
}
namespace NodeJS {
	interface ProcessEnv {
		[key: string]: string | undefined;
		PORT: number | undefined;
		SECRET: string;
	}
	interface Locals {
		auth: AuthToken;
	}
}
