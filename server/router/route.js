import { Router } from 'express';
const router = Router();
import Auth,{localVariables} from '../middleware/auth.js';
import {registerMail} from '../controllers/mailer.js';
//import { sendEmailWithAttachment } from '../pdf/pdfgenerating.js';
/** import all controllers */

import * as controller from '../controllers/appController.js'

/** post modules */
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail );
//router.route('/sendEmailWithAttachment').post(sendEmailWithAttachment);
router.route('/authenticate').post(controller.verifyUser,(req,res) => res.end());
router.route('/login').post(controller.verifyUser,controller.login);
/** get modules */
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser, localVariables,controller.generateOtp)
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)

/** put module */
router.route('/updateUser').put(Auth,controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword);





export default router;