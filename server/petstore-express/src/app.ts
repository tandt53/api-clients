import express, {Request, Response} from 'express';
import userController from "./controllers/user.controller";
import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '/src/my-images');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname);
    }
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/my-images'));


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


app.get('/pet/findByStatus', (req: Request, res: Response) => {
    res.send('find pet by status')
});


const upload = multer({dest: 'uploads/'});
app.post('/pet/:petId/uploadImage', upload.single('file'), (req, res) => {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        return res.send({
            success: true
        })
    }
});
