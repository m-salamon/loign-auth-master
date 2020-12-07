import bcrypt from 'bcryptjs';
import crypto from 'crypto';

function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

function getToken() {
    return crypto.randomBytes(16).toString('hex');
}

function comparePassword(storedPassowrd, enteredPassword) {
    return bcrypt.compare(enteredPassword, storedPassowrd);
}

export default {
    hashPassword,
    getToken,
    comparePassword
}