import express from 'express-promise-router';
const router = express();
import { createToken } from '../utils/tokens';
import db from '../repo';
import { emailSender } from '../utils/emailSender';
import _ from 'lodash'

router.post('/login', async (req, res) => {

    //check for empty
    if (_.isEmpty(req.body.email) || _.isEmpty(req.body.password)) {
        return
    }

    var ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').pop() : req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
    }
    req.body.ip = ip

    let user = await db.authRoutes.logIn(req.body);
    if (user && user.isVerified == true) {
        res.json({ success: true, token: createToken(user.id), userIdType: user.userType });
    } else if (user && user.isVerified  == false) {
        res.json({ success: false, message: 'Plese verify your email address' });
    } else {
        res.json({ success: false, message: 'Cannot log In, Please check your email or password and try again.' });
        //res.status(403).send('Invalid Login');
    }
})

router.post('/forgotPassword', async (req, res) => {

    //check for empty
    if (_.isEmpty(req.body.email)) {
        return
    }

    let createdtk = await db.authRoutes.createAndGetTempToken(req.body.email);
    let success = false;
    if (createdtk.result) {
        emailSender(req.body.email, createdtk.tempToken, 'resetPassword');
        success = true;
    }
    res.json({ success: success });
})

router.post('/resetPassword/:tempToken', async (req, res) => {
    let verify = await db.authRoutes.verifyTempToken(req.params.tempToken);
    if (verify) {
        let updatedpw = await db.authRoutes.updatePassword(verify.id, req.body.newPassword, verify.table);
        if (updatedpw) {
            res.json({ success: true });
        }
    }
    res.json({ success: false });
})

export default router;