import express from 'express';
const logoutRouter = express.Router();
import logoutController from '../../controllers/logoutController.js';

logoutRouter.route('/').get(logoutController.logoutUser);

export default logoutRouter;