import {User} from "../models/user";
import {v4 as uuidv4} from 'uuid';

export class UserService {
    private users: User[] = [];

    public createUser(user: User): User {
        user.id = `${uuidv4()}`;
        this.users.push(user);
        return user;
    }

    public updateUser(user: User): User | undefined {
        const index = this.users.findIndex(u => u.id == user.id);
        if (index == -1) {
            return undefined;
        }
        this.users[index] = user;
        return user;
    }

    public deleteUser(id: string): void {
        this.users = this.users.filter(u => u.id != id);
    }

    public getUserById(id: string): User {
        return <User>this.users.find(u => u.id === id);
    }

    public getUserByUsername(username: string): User {
        return <User>this.users.find(u => u.username === username);
    }

}
