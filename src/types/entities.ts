import { UUID } from 'crypto';

export interface UserEntity {
	email: string;
	password: string;
	id?: UUID;
	created_at?: string;
}

export interface RoleEntity {
	id?: UUID;
	name: string;
	description?: string;
}
