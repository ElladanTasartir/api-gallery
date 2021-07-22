import { config } from 'dotenv';
config();

export const mongoDbURI = `mongodb://${process.env.MONGODB_URI}`;

export const jwt = {
  secret: process.env.JWT_SECRET || 'secret',
  expiresIn: process.env.EXPIRES_IN,
};