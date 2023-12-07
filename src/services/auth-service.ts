import { UserDetail, UserRole } from '../types';
import { jwtUtil } from '../utils';

const DEMO_USER: UserDetail = {
	email: 'test@test.com',
	password: 'password',
	roles: [UserRole.ADMIN],
};

function attemptLoginWithEmailAndPassword(email: string, password: string) {
	if (DEMO_USER.email !== email || DEMO_USER.password !== password) {
		throw new Error('Invalid credentials');
	}
	return jwtUtil.issueToken(1, DEMO_USER.email, DEMO_USER.roles);
}

export default { attemptLoginWithEmailAndPassword };
