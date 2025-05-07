import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/user.types';

export const protect = async (
 req: Request,
 res: Response,
 next: NextFunction
): Promise<void> => {
 try {
  let token;

  if (
   req.headers.authorization &&
   req.headers.authorization.startsWith('Bearer')
  ) {
   token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
   res.status(401).json({
    success: false,
    error: 'Not authorized, no token',
   });
   return;
  }

  try {
   const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
   ) as JwtPayload;

   req.user = decoded;
   next();
  } catch (error) {
   res.status(401).json({
    success: false,
    error: 'Not authorized, token failed',
   });
   return;
  }
 } catch (error) {
  res.status(500).json({
   success: false,
   error: error instanceof Error ? error.message : 'Server error',
  });
 }
};
