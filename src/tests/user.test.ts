import { validate } from 'uuid';

describe('users', () => {
	let userID = '';

	// USER TEST CASE
	it('get empty array of users', async () => {
		const response = await fetch('http://localhost:3003/api/users', {
			method: 'GET',
		});
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.length).toBe(0);
	});

	it('create a user', async () => {
		const user = {
			username: 'Jo',
			age: 31,
			hobbies: ['hockey', 'poetry'],
		};

		const response = await fetch('http://localhost:3003/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		});

		const data = await response.json();

		expect(response.status).toBe(201);
		expect(validate(data.id)).toBeTruthy();
		expect(data.username).toBe(user.username);
		expect(data.age).toBe(user.age);
	});

	it('get all users with lenght of 1', async () => {
		const response = await fetch('http://localhost:3003/api/users', {
			method: 'GET',
		});
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.length).toBe(1);
		userID = data[0].id;
	});

	it('get a user by ID', async () => {
		const response = await fetch(`http://localhost:3003/api/users/${userID}`, {
			method: 'GET',
		});
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(validate(data.id)).toBeTruthy();
		expect(data.id).toBe(userID);
		expect(data.username).toBe('Jo');
		expect(data.age).toBe(31);
	});

	it('update a user by ID', async () => {
		const response = await fetch(`http://localhost:3003/api/users/${userID}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: 'Nick',
				age: 22,
			}),
		});
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(validate(data.id)).toBeTruthy();
		expect(data.id).toBe(userID);
		expect(data.username).toBe('Nick');
		expect(data.age).toBe(22);
		expect(data.hobbies[0]).toBe('hockey');
	});

	it('delete a user by ID', async () => {
		const response = await fetch(`http://localhost:3003/api/users/${userID}`, {
			method: 'DELETE',
		});

		expect(response.status).toBe(204);
	});

	it('user is not found by ID', async () => {
		const response = await fetch(`http://localhost:3003/api/users/${userID}`, {
			method: 'GET',
		});
		const data = await response.text();

		expect(response.status).toBe(404);
		expect(data).toBe(`User with ${userID} doen't exist`);
	});

	// ERRORS TEST CASE
	it('page not found', async () => {
		const response = await fetch('http://localhost:3003/api/pictures', {
			method: 'GET',
		});

		const text = await response.text();
		expect(text).toBe('Page not found!');
	});

	it('error on create a user without age', async () => {
		const user = {
			username: 'Jo',
			hobbies: ['hockey', 'poetry'],
		};

		const response = await fetch('http://localhost:3003/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		});

		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.errors[0]).toBe('age is required');
	});

	it('error on create a user with username type number ', async () => {
		const user = {
			username: 666,
			age: 22,
			hobbies: ['hockey', 'poetry'],
		};

		const response = await fetch('http://localhost:3003/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		});

		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.errors[0]).toBe('username type is not string');
	});

	it('create a user', async () => {
		const user = {
			username: 'Jane',
			age: 18,
			hobbies: ['dance'],
		};

		const response = await fetch('http://localhost:3003/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		});

		const data = await response.json();
		userID = data.id;

		expect(response.status).toBe(201);
		expect(validate(data.id)).toBeTruthy();
		expect(data.username).toBe(user.username);
		expect(data.age).toBe(user.age);
	});

	it('error on update a user with age type string', async () => {
		const response = await fetch(`http://localhost:3003/api/users/${userID}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: 'Nick',
				age: '22',
			}),
		});
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data.errors[0]).toBe('age type is not number');
	});

	it('delete a user by ID', async () => {
		const response = await fetch(`http://localhost:3003/api/users/${userID}`, {
			method: 'DELETE',
		});

		expect(response.status).toBe(204);
	});

	it('error on get a user with invalid ID', async () => {
		const response = await fetch(
			`http://localhost:3003/api/users/invalid-user-uuid`,
			{
				method: 'GET',
			}
		);

		const data = await response.text();
		expect(data).toBe('provided ID is invalid');
		expect(response.status).toBe(400);
	});

	// USER LIST TEST CASE
	it('create 3 users', async () => {
		const user1 = {
			username: 'John',
			age: 31,
			hobbies: ['poker', 'TV'],
		};
		const user2 = {
			username: 'Jane',
			age: 20,
			hobbies: ['books', 'TV'],
		};
		const user3 = {
			username: 'Bobby',
			age: 4,
			hobbies: ['toys', 'TV'],
		};

		const response1 = await fetch('http://localhost:3003/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user1),
		});
		expect(response1.status).toBe(201);

		const response2 = await fetch('http://localhost:3003/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user1),
		});
		expect(response2.status).toBe(201);

		const response3 = await fetch('http://localhost:3003/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user1),
		});
		expect(response3.status).toBe(201);
	});

	it('get all users with lenght of 3', async () => {
		const response = await fetch('http://localhost:3003/api/users', {
			method: 'GET',
		});
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.length).toBe(3);
	});

	it('delete one user', async () => {
		const UserListResponse = await fetch('http://localhost:3003/api/users', {
			method: 'GET',
		});
		const userList = await UserListResponse.json();

		const response = await fetch(
			`http://localhost:3003/api/users/${userList[0].id}`,
			{
				method: 'DELETE',
			}
		);

		expect(response.status).toBe(204);
	});

	it('get all users with lenght of 2', async () => {
		const response = await fetch('http://localhost:3003/api/users', {
			method: 'GET',
		});
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.length).toBe(2);
	});

	it('delete all users', async () => {
		const UserListResponse = await fetch('http://localhost:3003/api/users', {
			method: 'GET',
		});
		const userList = await UserListResponse.json();

		userList.map(async (user) => {
			const response = await fetch(
				`http://localhost:3003/api/users/${user.id}`,
				{
					method: 'DELETE',
				}
			);
			expect(response.status).toBe(204);
		});
	});

	it('get empty array of users', async () => {
		const response = await fetch('http://localhost:3003/api/users', {
			method: 'GET',
		});
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data.length).toBe(0);
	});
});
