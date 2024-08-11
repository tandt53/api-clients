import express, { Request, Response } from "express";
import userController from "./controllers/user.controller";
import petController from "./controllers/pet.controller";

import multer from "multer";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// user
app.post("/user", userController.createUser);
app.put("/user/:id", userController.updateUser);
app.delete("/user/:id", userController.deleteUser);
app.get("/user/:id", userController.getUserById);
app.post("/user/login", userController.login);

// pet
app.post("/pet", petController.create);

app.get("/pet/:id", petController.getById);

app.get("/pet/findByStatus", petController.getByStatus);

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory to save uploaded files
    cb(null, "uploads/");
    console.log("file uploaded: ", file);
  },
  filename: function (req, file, cb) {
    // Specify the filename for the uploaded file
    cb(null, new Date() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post(
  "/pet/:id/uploadImage",
  upload.single("file"),
  petController.uploadImage,
);

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ message: "File uploaded successfully" });
});

app.listen(3001, () => {
  console.log("Server is running at port 3001");
});
