import http from 'http';
import { validate } from 'uuid';

import { param } from '../utils/parseParams';
import { store } from '../app';
import { bodyParser } from '../utils/bodyParser';
import { checkRequiredFields } from '../utils/checkRequiredFields';

export const updateUser = async (
	req: http.IncomingMessage,
	res: http.ServerResponse
) => {
	try {
		const id = param(req.url);
		if (!id || !validate(id)) {
			res.writeHead(400, { 'Content-Type': 'text/plain' });
			res.write('Invalid ID');
			res.end();
			return;
		}

		const user = store.find(id);

		if (user) {
			const body = await bodyParser(req);
			const errors = checkRequiredFields(body);

			if (errors) {
				if (errors.some((e) => e.match(/.*json.*/i))) {
					res.writeHead(400, { 'Content-Type': 'application/json' });
					res.write(JSON.stringify({ errors }));
					res.end();
					return;
				}
				const typeErrors = errors.filter((e) => e.match(/.*type.*/));
				if (typeErrors.length > 0) {
					res.writeHead(400, { 'Content-Type': 'application/json' });
					res.write(JSON.stringify({ errors: typeErrors }));
					res.end();
					return;
				}
			}

			const { username, age, hobbies } = body;
			if (username) user.username = username;
			if (age) user.age = age;
			if (hobbies) user.hobbies = hobbies;

			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(user));
			res.end();
		} else {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.write(`User with ${id} doen't exist`);
			res.end();
		}
	} catch (err) {
		res.writeHead(500, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify({ error: 'Internal server error' }));
		res.end();
	}
};
