import express, {Request, Response} from 'express';
import {User} from "./models/user";
import {v4 as uuidv4} from 'uuid';
import userController from "./controllers/user.controller";

const app = express();

app.use(express.json());
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// user

app.post('/user', (req: Request, res: Response) => {
    const createdUser = userController.createUser(req.body);
    res.send(createdUser);
});

app.put('/user/:id', (req: Request<{id: number}, {}, { user: User }, {}>, res: Response) => {
    const updatedUser = userController.updateUser(req.params.id, req.body.user);
    res.send(updatedUser);
});

app.delete('/user/:id', (req: Request<{ id: number }, {}, { user: User }, {}>, res: Response) => {
    const deletedUser = userController.deleteUser(req.params.id);
    res.statusCode = 204;
});

app.get('/user/:id', (req: Request<{id: number}, {}, { user: User }, {}>, res: Response) => {
    const user = userController.getUserById(req.params.id);
    res.send(user);
});

// pet
app.post('/pet', (req: Request, res: Response) => {
    res.send('create pet');
});

app.get('/pet/:petId', (req: Request, res: Response) => {
    res.send('get pet');
});

app.post('/pet/:petId/uploadImage', (req: Request, res: Response) => {
    res.send('upload image');
});

app.get('/pet/findByStatus', (req: Request, res: Response) => {
    res.send('find pet by status')
});
