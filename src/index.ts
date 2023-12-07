import express, { Request, Response, Application, NextFunction } from 'express';
import { Client } from 'pg';
import 'dotenv/config';

import authMiddleware from './middleware/auth-middleware';
import errorHandler from './middleware/error-handler';
import { authRouter } from './routers';

const app: Application = express();

app.use(express.json());

// Auth routes
app.use('/auth', authRouter);

app.use(authMiddleware);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send({ msg: 'hello', email: res.locals.auth?.email });
});

app.use(errorHandler);

async function main() {
	const client = new Client({ application_name: 'authentication' });
	await client.connect();

	const port = process.env.PORT;
	app.listen(port, () => {
		console.log(`Server started on port: ${port}.`);
	});
}

main().catch((err) => console.log(err));
