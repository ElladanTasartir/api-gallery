import { config } from 'dotenv';
config();

export const port = process.env.PORT || 3000;

export const mongoDBUri = `mongodb://${process.env.MONGODB_URI}`;

export const jwt = {
  secret: process.env.JWT_SECRET || 'secret',
  expiresIn: process.env.EXPIRES_IN,
};