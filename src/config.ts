import { config } from 'dotenv';
config();

export const port = process.env.PORT || 3000;

export const mongoDBUri = `mongodb://${process.env.MONGODB_URI}`;