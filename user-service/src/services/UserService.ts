import { UserRepository } from "../repositories/UserRepository.js";
import { User } from "../models/User.js";
import { randomUUID } from "node:crypto";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET!;

export class UserService {
    constructor(private UserRepo : UserRepository){}
    
    async register(email:string,password:string){
        const existing = await this.UserRepo.findByEmail(email);

        if(existing){
            throw new Error("User already existing")
        }

        const hashedPass = await bcrypt.hash(password,10)

        const user: User = {
            id: randomUUID(),
            email,
            password: hashedPass,
            };

        return this.UserRepo.create(user);
    }

    async login(email: string, password: string) {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }

  const user = await this.UserRepo.findByEmail(email);

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign(
    { userID: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
}
}