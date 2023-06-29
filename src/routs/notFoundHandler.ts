import http from 'http';

export const notFoundHandler = (
	req: http.IncomingMessage,
	res: http.ServerResponse
) => {
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.write('Page not found!');
	res.end();
};
