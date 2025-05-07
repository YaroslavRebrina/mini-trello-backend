import { Document } from 'mongoose';

export interface IUser {
 name: string;
 email: string;
 password: string;
}

export interface IUserDocument extends IUser, Document {
 createdAt: Date;
 updatedAt: Date;
 comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserSignupInput {
 name: string;
 email: string;
 password: string;
}

export interface UserLoginInput {
 email: string;
 password: string;
}

export interface JwtPayload {
 id: string;
}

declare global {
 namespace Express {
  interface Request {
   user?: JwtPayload;
  }
 }
}
