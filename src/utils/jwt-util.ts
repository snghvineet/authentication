import { env } from '.';
import { UserRole } from '../types';
import { sign } from 'jsonwebtoken';

function issueToken(id: number, email: string, roles: UserRole[]) {
	return sign({ e: email, a: roles }, env.get('SECRET').required().asString(), {
		algorithm: 'HS256',
		expiresIn: '1h',
		subject: id.toString(),
	});
}

export default { issueToken };
