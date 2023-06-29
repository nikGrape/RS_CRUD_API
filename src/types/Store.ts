import { User } from './User.ts';

export class Store {
	private users: User[] = [];

	public find = (id: string): User | undefined => {
		return this.users.find((user) => user.id === id);
	};

	public update = (
		id: string,
		username?: string,
		age?: number,
		hobbies?: string[]
	): boolean => {
		const user = this.find(id);
		if (!user) return false;

		if (username) user.username = username;
		if (age) user.age = age;
		if (hobbies) user.hobbies = hobbies;

		return true;
	};

	public remove = (id: string): boolean => {
		const user = this.find(id);
		if (user) {
			this.users = this.users.filter((user) => user.id !== id);
			return true;
		}
		return false;
	};

	public add = (user: User) => {
		this.users.push(user);
	};

	public getUsers = () => {
		return [...this.users];
	};
}
