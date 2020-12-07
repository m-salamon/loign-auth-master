import knex from './config';
import  hashHelpers from './authHelpers';
import db from './index';

async function createAndGetTempToken(email) {
    const tempToken = await hashHelpers.getToken();
    var tokenAddedToUser = await knex('users').update('tempToken', tempToken).where('email', email);
    let result = false;
    if (tokenAddedToUser) {
        result = true;
    }
    return { result, tempToken}
}

async function verifyTempToken(tempToken) {
    let usertk = await knex('users').select('id').where('tempToken', tempToken).first();
    if(usertk){
         return { id: usertk.id, table: 'users'}
    }
    return false
}
async function checkUserNameEmail(email) {
    const exists = await db.users.getUserByEmail(email);
    if (exists) {
        return true;
    }
    return false;
}
async function updatePassword(id, newPassword, table) {
    let hashed = await hashHelpers.hashPassword(newPassword);
    return knex(table).update('password', hashed).where('id', id);
}

async function logIn(login) {
    let userType = 'userId';
    
    let user = await db.users.loginUser(login);
    const final = (user);
    if (final) {
        final.userType = userType;
        return final;
    }
    return false;
}



export default{
    createAndGetTempToken,
    verifyTempToken,
    updatePassword,
    checkUserNameEmail,
    logIn
}