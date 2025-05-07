import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
 path: path.resolve(__dirname, '../../.env'),
});

export interface EnvironmentConfig {
 PORT: number;
 NODE_ENV: string;
 MONGODB_URI: string;
 JWT_SECRET: string;
 JWT_EXPIRATION: string;
 LOG_LEVEL: string;
}

const config: EnvironmentConfig = {
 PORT: parseInt(process.env.PORT || '3001', 10),
 NODE_ENV: process.env.NODE_ENV || 'development',
 MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app',
 JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret',
 JWT_EXPIRATION: process.env.JWT_EXPIRATION || '24h',
 LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

export default config;
