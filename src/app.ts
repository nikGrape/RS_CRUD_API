import dotenv from 'dotenv';

import Server from './utils/Server';
import { getAllUsers } from './routs/getAllUsers';
import { getUserById } from './routs/getUserById';
import { addUser } from './routs/addUser';
import { notFoundHandler } from './routs/notFoundHandler';
import { updateUser } from './routs/updateUser';
import { deleteUser } from './routs/deleteUser';
import { Store } from './types/Store';

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
