import { User } from "../models/User.js";

export class UserRepository{
    private users: User[] = [];

    async create(user:User): Promise<User>{
        this.users.push(user)
        return user;
    }
    async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }
}