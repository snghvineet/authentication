import { Pool, QueryConfig } from 'pg';

const pool = new Pool();

export const query = async (text: string | QueryConfig, params: any[]) => {
	const start = Date.now();
	const res = await pool.query(text, params);
	const duration = Date.now() - start;
	console.log('executed query', { text, duration, rows: res.rowCount });
	return res;
};

export const getClient = async () => {
	const client = await pool.connect();
	return client;
};
