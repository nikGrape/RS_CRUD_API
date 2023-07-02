import { removeSlashesFromTheEnd } from './compareUrl';

export const param = (url: string | undefined): string | undefined => {
	if (!url) return undefined;
	url = removeSlashesFromTheEnd(url);

	return url.split('/').pop();
};
