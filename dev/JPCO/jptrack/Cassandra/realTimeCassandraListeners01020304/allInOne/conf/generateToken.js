import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.TOKEN_SECRET;

jwt.sign({ app: 'appName', created_at: new Date().toISOString() }, secretKey, {}, function(err, token) {
    console.log("Secret : ", secretKey);
    console.log("Token : ", token);
});
