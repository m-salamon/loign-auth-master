import jwt from 'jsonwebtoken';
import _ from 'lodash'

export const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.AUTH_SECRET, {
        expiresIn: 10  //'1825d' //5 years
    });
}

export const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token && token !== 'null') {
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
            if (err) {
                res.json({ error: err.name });
                return;
            } else {
                req.userId = decoded.userId;
                next();
            }
        });
    } else {
        res.status(403).send('Unauthrized')
    }
}