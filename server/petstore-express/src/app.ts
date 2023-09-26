import express, {Request, Response} from 'express';
import userController from "./controllers/user.controller";
import petController from "./controllers/pet.controller";

import multer from "multer";
import path from "path";

const app = express();

app.use(express.json());
// app.use(upload());
app.use(express.urlencoded({extended: true}));


app.listen(3001, () => {
    console.log('Server is running at port 3001');
});
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// user
app.post('/user', userController.createUser);
app.put('/user/:id', userController.updateUser);
app.delete('/user/:id', userController.deleteUser);
app.get('/user/:id', userController.getUserById);
app.post('/user/login', userController.login);


// pet
app.post('/pet', petController.create);

app.get('/pet/:id', petController.getById);


app.get('/pet/findByStatus', petController.getByStatus);

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    }),
});

app.post("pet/:id/upload_files", upload.fields([{name: 'file'}]), petController.uploadImage);
