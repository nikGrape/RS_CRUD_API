import uuid from 'uuid';
import http from 'http';
import { User } from '../types/User.ts';
import { store } from '../app.ts';

/**
 Server should answer with status code 400 and corresponding message if request body does not contain required fields
 * check body types
 */

const checkBody = (body: any): string[] | null => {
	const errors = [];
	if (!body.username) errors.push('username');
	if (!body.age) errors.push('age');
	if (!body.hobbies) errors.push('hobbies');
	return errors.length > 0 ? errors : null;
};

export const addUser = (
	req: http.IncomingMessage,
	res: http.ServerResponse
) => {
	let data = '';
	req.setEncoding('utf-8');
	req
		.on('data', (chunk) => {
			data += chunk;
		})
		.on('end', () => {
			const body = JSON.parse(data);
			const error = checkBody(body);

			if (error) {
				res.writeHead(400, { 'Content-Type': 'text/plain' });
				res.write('missing parameters: ' + JSON.stringify(error));
				res.end();
				return;
			}

			const user = new User(body.username, body.age, body.hobbies);
			store.add(user);
			res.writeHead(201, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(user));
			res.end();
		});
};
