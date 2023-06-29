import http from 'http';

import { compare } from './compareUrl.ts';

class Server {
	paths: { path: string; method: string }[] = [];
	app = http.createServer((req, res) => {
		console.log('URL: ', req.url);
		console.log('METHOD: ', req.method);
	});

	listen = (port: number, calback: () => void) => {
		this.app.listen(port, calback);
	};

	get = (
		path: string,
		listener: (req: http.IncomingMessage, res: http.ServerResponse) => void
	) => {
		this.paths.push({ path, method: 'GET' });
		this.app.addListener('request', (req, res) => {
			if (req.method == 'GET' && compare(path, req.url)) {
				listener(req, res);
			}
		});
	};

	post = (
		path: string,
		listener: (req: http.IncomingMessage, res: http.ServerResponse) => void
	) => {
		const regex = new RegExp(`/*${path}/*`);
		this.paths.push({ path, method: 'POST' });
		this.app.addListener('request', (req, res) => {
			if (req.method == 'POST' && compare(path, req.url)) {
				listener(req, res);
			}
		});
	};

	put = (
		path: string,
		listener: (req: http.IncomingMessage, res: http.ServerResponse) => void
	) => {
		this.paths.push({ path, method: 'PUT' });
		this.app.addListener('request', (req, res) => {
			if (req.method == 'PUT' && compare(path, req.url)) {
				listener(req, res);
			}
		});
	};

	delete = (
		path: string,
		listener: (req: http.IncomingMessage, res: http.ServerResponse) => void
	) => {
		this.paths.push({ path, method: 'DELETE' });
		this.app.addListener('request', (req, res) => {
			if (req.method == 'DELETE' && compare(path, req.url)) {
				listener(req, res);
			}
		});
	};

	pageNotFoud = (
		callback: (req: http.IncomingMessage, res: http.ServerResponse) => void
	) => {
		this.app.addListener('request', (req, res) => {
			if (
				!this.paths.some(
					(v) => compare(v.path, req.url) && v.method == req.method
				)
			) {
				callback(req, res);
			}
		});
	};
}

export default Server;
