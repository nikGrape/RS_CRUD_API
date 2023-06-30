const request = require('supertest');
require('dotenv').config();
import { validate } from 'uuid';

describe('errors', () => {
	let userID = '';

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
});
