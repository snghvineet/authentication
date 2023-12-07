import { AuthRequest } from '.';

interface UserDetail extends AuthRequest {
	roles: UserRole[];
}

enum UserRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export { UserRole };
export default UserDetail;
