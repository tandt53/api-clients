import express, {Request, Response} from 'express';
import {User} from "./models/user";
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
app.post('/user', userController.createUser);

app.put('/user/:id', userController.updateUser);

app.delete('/user/:id', userController.deleteUser);

app.get('/user/:id', userController.getUserById);

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
