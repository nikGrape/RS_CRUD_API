import { v1 } from 'uuid';

export type user = {
	id: string;
	username: string;
	age: number;
	hobbies: string[];
};

export class User {
	id: string;
	username: string;
	age: number;
	hobbies: string[];

	constructor(username: string, age: number, hobbies: string[]) {
		this.id = v1();
		this.username = username;
		this.age = age;
		this.hobbies = hobbies;
	}
}
