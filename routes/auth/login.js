import express from 'express';
const loginRouter = express.Router();
import loginController from '../../controllers/loginController.js';

loginRouter.route('/').post(loginController.loginUser);

export default loginRouter;