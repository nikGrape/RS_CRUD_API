const path = 'api/hello////';
const pattern = `^/*${path}/*$`;

const compare = (path, url) => {
	return new RegExp(`^/*${path}/*$`, 'i').exec(url) ? true : false;
};

const regex = new RegExp(pattern, 'i');

const res = compare('/api/users', '/api');

console.log(res);

let a = path.replace(/\/*$/, '');

console.log(a);
