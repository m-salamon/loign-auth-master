var router = require('express-promise-router')()
import  db from '../repo';

router.get('/getUserProfile', async (req, res) => {
    let profile = await db.users.getUserProfile(req.userId);
    profile ? res.json({ success: true, profile: profile }) : '';
});
router.get('/checkLog', async (req, res) => {
    let user = await db.users.check(req.userId);
    if(user){
        res.json({ authenticated: true });
    }else{
        res.json({ authenticated: false });
    }
});

module.exports  =  router;