import http from 'http';
import { User } from '../types/User';
import { store } from '../app';
import { bodyParser } from '../utils/bodyParser';
import { checkRequiredFields } from '../utils/checkRequiredFields';

export const addUser = async (
	req: http.IncomingMessage,
	res: http.ServerResponse
) => {
	try {
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
	} catch (err) {
		res.writeHead(500, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify({ error: 'Internal server error' }));
		res.end();
	}
};
