import {User} from "../models/user";


export class UserService {
    private users: User[] = [];

    public createUser(user: User): User {
        user.id = this.users.length + 1;
        this.users.push(user);
        return user;
    }

    public updateUser(user: User): User {
        const index = this.users.findIndex(u => u.id === user.id);
        this.users[index] = user;
        return user;
    }

    public deleteUser(id: number): void {
        this.users = this.users.filter(u => u.id !== id);
    }

    public getUserById(id: number): User {
        return <User>this.users.find(u => u.id === id);
    }

    public getUserByUsername(username: string): User {
        return <User>this.users.find(u => u.username === username);
    }

}
