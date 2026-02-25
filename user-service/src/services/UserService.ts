import { UserRepository } from "../repositories/UserRepository.js";
import { User } from "../models/User.js";
import { randomUUID, RandomUUIDOptions } from "node:crypto";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretkey";

export class UserService {
    constructor(private UserRepo : UserRepository){}
    
    async register(email:string,password:string){
        const existing = await this.UserRepo.findByEmail(email);

        if(existing){
            throw new Error("User already existing")
        }

        const hashedPass = await bcrypt.hash(password,10)

        const user = new User(randomUUID(),email, hashedPass);

        return this.UserRepo.create(user);
    }

    async login(email:string,password:string){
        const user = await this.UserRepo.findByEmail(email);

        if(!user){
            throw new Error("Invalid Credentials")
        }

        const valid = bcrypt.compare(password,user.password)

        if(!valid){
            throw new Error("Invalid Credentials")
        }
        const token = jwt.sign(
            {userID:user.id,email:user.email},
            JWT_SECRET,
            {expiresIn: "1h"}
        );
        return {token:token}
    }
}