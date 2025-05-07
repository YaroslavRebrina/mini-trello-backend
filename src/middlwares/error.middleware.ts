import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export class AppError extends Error {
 statusCode: number;
 isOperational: boolean;

 constructor(message: string, statusCode: number) {
  super(message);
  this.statusCode = statusCode;
  this.isOperational = true;

  Error.captureStackTrace(this, this.constructor);
 }
}

interface ErrorResponse {
 message: string;
 stack?: string;
 errors?: any;
}

const isTrustedError = (error: any): boolean => {
 if (error instanceof AppError) {
  return error.isOperational;
 }
 return false;
};

export const errorHandler = (
 err: any,
 req: Request,
 res: Response,
 next: NextFunction
): void => {
 console.error(`Error: ${err.message}`);

 let statusCode = err.statusCode || 500;
 const errorResponse: ErrorResponse = {
  message: err.message || 'Internal Server Error',
 };

 if (process.env.NODE_ENV !== 'production') {
  errorResponse.stack = err.stack;
 }

 if (err instanceof mongoose.Error.ValidationError) {
  statusCode = 400;
  errorResponse.message = 'Validation Error';
  errorResponse.errors = Object.values(err.errors).map((val) => val.message);
 }

 if (err instanceof mongoose.Error.CastError) {
  statusCode = 400;
  errorResponse.message = `Invalid ${err.path}: ${err.value}`;
 }

 if (err.code === 11000) {
  statusCode = 400;
  const field = Object.keys(err.keyValue)[0];
  errorResponse.message = `Duplicate field value: ${field}. Please use another value.`;
 }

 if (err.name === 'JsonWebTokenError') {
  statusCode = 401;
  errorResponse.message = 'Invalid token. Please log in again.';
 }

 if (err.name === 'TokenExpiredError') {
  statusCode = 401;
  errorResponse.message = 'Your token has expired. Please log in again.';
 }

 res.status(statusCode).json({
  success: false,
  error: errorResponse,
 });

 if (!isTrustedError(err) && process.env.NODE_ENV === 'production') {
  console.error('CRITICAL ERROR:', err);
 }
};
