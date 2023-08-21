import express, {Request, Response} from 'express';

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
    res.send('create user');
});

app.put('/user/:id', (req: Request, res: Response) => {
    res.send('update user');
});

app.delete('/user/:id', (req: Request, res: Response) => {
    res.send('delete user');
});

app.get('/user/:id', (req: Request, res: Response) => {
    res.send('get user');
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
