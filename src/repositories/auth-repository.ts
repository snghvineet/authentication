import { UserEntity, UserRole } from '../types';
import * as db from '../database/index';
import { UUID } from 'crypto';

export async function create(user: UserEntity) {
	const client = await db.getClient();
	try {
		await client.query('BEGIN');
		const query =
			'INSERT INTO auth.users (email, password) VALUES($1, $2) RETURNING *';
		const values = [user.email, user.password];
		const res = await client.query(query, values);
		const data = res.rows.pop() as UserEntity;
		await client.query(
			'INSERT INTO auth.users_to_roles (user_id, role_id) VALUES($1, $2)',
			[data.id!, '0492a55c-b60e-4263-b355-48687f990fc3']
		);
		await client.query('COMMIT');
		return data;
	} catch (e) {
		console.log(e);
		await client.query('ROLLBACK');
	} finally {
		client.release();
	}
}

export async function findUserWithEmail(email: string) {
	const query = `SELECT * from auth.users WHERE email = $1`;
	const values = [email];
	const res = await db.query(query, values);

	if (res.rowCount) return res.rows.pop() as UserEntity;
	return null;
}

export async function getRolesByUserId(id: UUID) {
	const query = `SELECT r.id as id, r.name as name from auth.roles as r join auth.users_to_roles as ur on r.id = ur.role_id WHERE ur.user_id = $1`;
	const values = [id];
	const res = await db.query(query, values);
	type returnType = {
		id: UUID;
		name: UserRole;
	};
	return res.rows as returnType[];
}
