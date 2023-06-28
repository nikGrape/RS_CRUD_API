import http from 'http';

const app = http.createServer((req, res) => {
	console.log(req.url);

	res.writeHead(200, { 'Content-Type': 'text' });
	res.write('Test response');
	res.end();
});

const PORT = process.env.PORT || 3003;

app.listen(3003, () => {
	console.log(`Server started on port: ${PORT}`);
});
