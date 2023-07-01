import http from 'http';
import { store } from '../app';

export const getAllUsers = (
	req: http.IncomingMessage,
	res: http.ServerResponse
) => {
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify(store.getUsers()));
	res.end();
};
