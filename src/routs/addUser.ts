import http from 'http';
import { User } from '../types/User.ts';
import { store } from '../app.ts';
import { bodyParser } from '../utils/bodyParser.ts';
import { checkRequiredFields } from '../utils/checkRequiredFields.ts';

export const addUser = async (
	req: http.IncomingMessage,
	res: http.ServerResponse
) => {
	const body = await bodyParser(req);
	const errors = checkRequiredFields(body);

	if (errors) {
		res.writeHead(400, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify({ errors }));
		res.end();
		return;
	}

	const user = new User(body.username, body.age, body.hobbies);
	store.add(user);
	res.writeHead(201, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify(user));
	res.end();
};
