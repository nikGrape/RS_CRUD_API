import dotenv from 'dotenv';

import Server from './utils/Server.ts';
import { getAllUsers } from './routs/getAllUsers.ts';
import { getUserById } from './routs/getUserById.ts';
import { addUser } from './routs/addUser.ts';
import { notFoundHandler } from './routs/notFoundHandler.ts';
import { updateUser } from './routs/updateUser.ts';
import { deleteUser } from './routs/deleteUser.ts';
import { Store } from './types/Store.ts';

dotenv.config();

const app = new Server();
export const store = new Store();

app.get('/api/users', getAllUsers);
app.get('/api/users/{userId}', getUserById);
app.post('/api/users', addUser);
app.put('/api/users/{userId}', updateUser);
app.delete('/api/users/{userId}', deleteUser);

app.pageNotFoud(notFoundHandler);

const PORT = process.env.PORT || 3003;

app.listen(3003, () => {
	console.log(`Server started on port: ${PORT}`);
});
