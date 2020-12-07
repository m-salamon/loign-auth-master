require('dotenv').config();

var express = require('express');
var app = express()
import bodyParser from 'body-parser';
import { router } from './routes';
import { authRouter } from './authRoutes';
import { checkToken } from './utils/tokens';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', checkToken, router);
app.use('/auth', authRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));
