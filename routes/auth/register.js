import express from 'express';
const registerRouter = express.Router();
import registerController from '../../controllers/registerController.js'

registerRouter.route('/').post(registerController.createUser);

export default registerRouter;