import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {Request, Response} from "express";

const userService = new UserService();

class UserController {

    public createUser(req: Request, res: Response) {
        const existingUser = userService.getUserByUsername(req.body.username);
        if (existingUser) {
            res.send('User already exists');
        }
        res.send(userService.createUser(req.body));
    }

    public updateUser(req: Request<{ id: string }, {}, {}, {}>, res: Response) {
        const id = req.params.id;
        const existingUser = userService.getUserById(id);
        const updateUser = <User>req.body;
        updateUser.id = existingUser.id;
        if (existingUser) {
            res.send(userService.updateUser(updateUser));
        } else
            res.send(`User with id ${id} does not exist`);
    }

    public deleteUser(req: Request<{ id: string }, {}, {}, {}>, res: Response) {
        const id = req.params.id;
        const existingUser = userService.getUserById(id);
        if (existingUser) {
            userService.deleteUser(id);
            const remainingUsers = userService.getUserById(id);
            if (!remainingUsers)
                res.send(`User with id ${id} deleted`);
            else
                res.send(`User with id ${id} not deleted`);
        } else
            res.send(`User with id ${id} does not exist`);
    }

    public getUserById(req: Request<{ id: string }, {}, {}, {}>, res: Response) {
        const id = req.params.id;
        const existingUser = userService.getUserById(id);

        if (!existingUser) {
            res.send(`User with id ${id} does not exist`);
        } else
            res.send(userService.getUserById(id));
    }

    public getUserByUsername(username: string): User {
        return userService.getUserByUsername(username);
    }

}

export default new UserController();
