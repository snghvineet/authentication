import { authRepository } from '../repositories';
import { UserDetail, UserEntity, UserRole } from '../types';
import { jwtUtil } from '../utils';
import * as bcrypt from 'bcrypt';

const DEMO_USER: UserDetail = {
	email: 'test@test.com',
	password: 'password',
	roles: [UserRole.ADMIN],
};

async function createAccount(email: string, password: string) {
	const hashedPassword = await bcrypt.hash(password, 12);
	return await authRepository.create({ email, password: hashedPassword });
}

async function attemptLoginWithEmailAndPassword(
	email: string,
	password: string
) {
	const user: UserEntity | null = await authRepository.findUserWithEmail(email);
	if (!user) throw Error('Invalid email');
	const passwordMatches = await bcrypt.compare(password, user.password);
	if (!passwordMatches) throw Error('Wrong password');
	const roles = (await authRepository.getRolesByUserId(user.id!)).map(
		(role) => role.name
	);
	return jwtUtil.issueToken(1, user.email, roles);
}

export default { attemptLoginWithEmailAndPassword, createAccount };
