import Server from './Server';

const app = new Server();

app.get('/api', (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('Test response');
	res.end();
});

app.get('/api/users', (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('And Hello to You my friend!');
	res.end();
});

app.post('/api/users', (req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('test for post method');
	res.end();
});

app.pageNotFoud((req, res) => {
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.write('Page not found!');
	res.end();
});

const PORT = process.env.PORT || 3003;

app.listen(3003, () => {
	console.log(`Server started on port: ${PORT}`);
});
