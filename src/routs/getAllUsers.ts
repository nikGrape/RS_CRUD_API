import http from 'http';
import { store } from '../app';

export const getAllUsers = (
	req: http.IncomingMessage,
	res: http.ServerResponse
) => {
	try {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify(store.getUsers()));
		res.end();
	} catch (err) {
		res.writeHead(500, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify({ error: 'Internal server error' }));
		res.end();
	}
};
