import { Document } from 'mongoose';

export interface ITodo {
 label: string;
}

export interface ITodoDocument extends ITodo, Document {
 createdAt: Date;
 updatedAt: Date;
}

export interface CreateTodoInput {
 label: string;
 id: string;
}

export interface UpdateTodoInput {
 label: string;
 id: string;
}
