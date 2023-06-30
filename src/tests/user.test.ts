const request = require('supertest');
require('dotenv').config();
import { validate } from 'uuid';

describe('users', () => {
	let firstUserId = '';

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
		firstUserId = data[0].id;
	});

	it('get a user by ID', async () => {
		const response = await fetch(
			`http://localhost:3003/api/users/${firstUserId}`,
			{
				method: 'GET',
			}
		);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(validate(data.id)).toBeTruthy();
		expect(data.id).toBe(firstUserId);
		expect(data.username).toBe('Jo');
		expect(data.age).toBe(31);
	});

	it('update a user by ID', async () => {
		const response = await fetch(
			`http://localhost:3003/api/users/${firstUserId}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: 'Nick',
					age: 22,
				}),
			}
		);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(validate(data.id)).toBeTruthy();
		expect(data.id).toBe(firstUserId);
		expect(data.username).toBe('Nick');
		expect(data.age).toBe(22);
		expect(data.hobbies[0]).toBe('hockey');
	});

	it('delete a user by ID', async () => {
		const response = await fetch(
			`http://localhost:3003/api/users/${firstUserId}`,
			{
				method: 'DELETE',
			}
		);

		expect(response.status).toBe(204);
	});

	it('user is not found by ID', async () => {
		const response = await fetch(
			`http://localhost:3003/api/users/${firstUserId}`,
			{
				method: 'GET',
			}
		);
		const data = await response.text();

		expect(response.status).toBe(404);
		expect(data).toBe(`User with ${firstUserId} doen't exist`);
	});
});
