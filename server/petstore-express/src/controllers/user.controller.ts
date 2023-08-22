import {User} from "../models/user";
import {UserService} from "../services/user.service";


export class UserController {
    private userService = new UserService();

    public createUser(user: User): User {
        const existingUser = this.userService.getUserByUsername(user.username);
        if (existingUser) {
            throw new Error('User already exists');
        }
        return this.userService.createUser(user);
    }

    public updateUser(id: number, user: User): User {
        const existingUser = this.userService.getUserById(id);
        if (existingUser) {
            return this.userService.updateUser(user);
        } else
            throw new Error(`User with id ${id} does not exist`);
    }

    public deleteUser(id: number): void {
        const existingUser = this.userService.getUserById(id);
        if (existingUser) {
            this.userService.deleteUser(id);
        } else
            throw new Error(`User with id ${id} does not exist`);
    }

    public getUserById(id: number): User {
        return this.userService.getUserById(id);
    }

    public getUserByUsername(username: string): User {
        return this.userService.getUserByUsername(username);
    }

}
export default new UserController();
