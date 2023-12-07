import { UserRole } from '.';

interface AuthRequest {
	email: string;
	password: string;
}

interface AuthResponse {
	accessToken: string;
}

interface AuthToken {
	id: string;
	email: string;
	roles: UserRole[];
	expiresAt: number;
}
export { AuthRequest, AuthResponse, AuthToken };
