export const compare = (path: string, url: string | undefined): boolean => {
	if (!url) return false;
	url = removeSlashesFromTheEnd(url);
	if (path.indexOf('{') > 0) {
		let a = url.substring(0, url.lastIndexOf('/'));
		let b = path.substring(0, path.indexOf('{') - 1);
		console.log(a, b);
		return a == b;
	}

	return url === path;
};

function removeSlashesFromTheEnd(url: string): string {
	return url.replace(/\/*$/, '');
}

const path = '/api/users/{userId}';
const url = '/api/users/d44e2b5e-f7eb-4259-b1b9-1a3b65101118';

console.log(compare(path, url));
