export const compare = (path: string, url: string | undefined): boolean => {
	if (!url) return false;
	url = removeSlashesFromTheEnd(url);
	if (path.indexOf('{userId}') > 0) {
		return (
			url.substring(0, url.lastIndexOf('/')) ==
			path.substring(0, path.indexOf('{') - 1)
		);
	}

	return url === path;
};

export const removeSlashesFromTheEnd = (url: string): string => {
	return url.replace(/\/*$/, '');
};
