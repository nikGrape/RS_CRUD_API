import http from 'http';
import { validate } from 'uuid';

import { param } from '../utils/parseParams';
import { store } from '../app';

export const deleteUser = (
	req: http.IncomingMessage,
	res: http.ServerResponse
) => {
	const id = param(req.url);
	if (!id || !validate(id)) {
		res.writeHead(400, { 'Content-Type': 'text/plain' });
		res.write('provided ID is invalid');
		res.end();
		return;
	}

	if (store.remove(id)) {
		res.writeHead(204, { 'Content-Type': 'text/plain' });
		res.end();
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.write(`User with ${id} doen't exist`);
		res.end();
	}
};
