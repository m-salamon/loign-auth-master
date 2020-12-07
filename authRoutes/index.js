var express = require('express');
var authRouter = express.Router();

import login from './login';
import users from './users';

authRouter.use('/login', login);
authRouter.use('/users', users);


export { authRouter };
