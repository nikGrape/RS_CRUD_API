export const checkRequiredFields = (body: any): string[] | null => {
	const errors = [];
	if (typeof body != 'object') return ['body is not a valid Json'];

	if (!body.username) errors.push('username is required');
	else if (typeof body.username != 'string')
		errors.push('username type is not string');

	if (!body.age) errors.push('age is required');
	else if (typeof body.age != 'number') errors.push('age type is not number');

	if (!body.hobbies) errors.push('hobbies is required');
	else if (Array.isArray(body.hobbies)) {
		if (body.hobbies.some((v) => typeof v != 'string'))
			errors.push('hobbies type is not string');
	} else {
		errors.push('hobbies type is not array');
	}

	return errors.length > 0 ? errors : null;
};
