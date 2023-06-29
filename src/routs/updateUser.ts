import http from 'http';
import { validate } from 'uuid';

import { param } from '../utils/parseParams.ts';
import { store } from '../app.ts';

/**
 * check body types
 */
export const updateUser = (
	req: http.IncomingMessage,
	res: http.ServerResponse
) => {
	const id = param(req.url);
	if (!id || !validate(id)) {
		res.writeHead(400, { 'Content-Type': 'text/plain' });
		res.write('Invalid ID');
		res.end();
		return;
	}

	const user = store.find(id);

	if (user) {
		let data = '';
		req.setEncoding('utf-8');
		req
			.on('data', (chunk) => {
				data += chunk;
			})
			.on('end', () => {
				const body = JSON.parse(data);
				const { username, age, hobbies } = body;
				if (username) user.username = username;
				if (age) user.age = age;
				if (hobbies) user.hobbies = hobbies;
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(user));
				res.end();
			});
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.write(`User with ${id} doen't exist`);
		res.end();
	}
};
