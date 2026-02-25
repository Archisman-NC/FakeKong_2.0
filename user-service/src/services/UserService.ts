import { UserRepository } from "../repositories/UserRepository.js";
import { User } from "../models/User.js";
import { randomUUID, RandomUUIDOptions } from "node:crypto";

export class UserService {
    constructor(private UserRepo : UserRepository){}
    
    async register(email:string,password:string){
        const existing = await this.UserRepo.findByEmail(email);

        if(existing){
            throw new Error("User already existing")
        }

        const user = new User(randomUUID(),email,password);

        return this.UserRepo.create(user);
    }
}