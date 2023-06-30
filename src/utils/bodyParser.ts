import http from 'http';

export const bodyParser = (req: http.IncomingMessage): Promise<any> => {
	return new Promise((resolve, reject) => {
		let stringObject = '';
		req
			.on('data', (chunk) => {
				stringObject += chunk;
			})
			.on('end', () => {
				try {
					resolve(JSON.parse(stringObject));
				} catch (err) {
					resolve(err.message);
				}
			})
			.on('error', (err) => {
				resolve(err.message);
			});
	});
};
