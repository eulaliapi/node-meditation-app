import express from 'express';
import cookieParser from 'cookie-parser';

import credentials from './middlewares/credentials.js';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import verifyJWT from './middlewares/verifyJWT.js';

import rootRouter from './routes/root.js';
import registerRouter from './routes/auth/register.js';
import loginRouter from './routes/auth/login.js';
import logoutRouter from './routes/auth/logout.js';
const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use('/', rootRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use(verifyJWT);
app.use('/logout', logoutRouter);

app.all('*', (req, res) => {
    res.status(404).json({"message": "route not found"});
})

app.listen(8000, () => {
    console.log("Server started on port 8000");
});