import http from 'http';

export const getAllUsers = (
	req: http.IncomingMessage,
	res: http.ServerResponse
) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('And Hello to You my friend!');
	res.end();
};
