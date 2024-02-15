import { Router } from 'express';
const router = Router();

/** import all controllers */

import * as controller from '../controllers/appController.js'

/** post modules */
router.route('/register').post(controller.register);
//router.route('/registerMail').post();
router.route('/authenticate').post((req,res) => res.end());
router.route('/login').post(controller.login);

/** get modules */
router.route('/user/:username').get(controller.getUser)
router.route('/generateOTP').get(controller.generateOtp)
router.route('/verifyOTP').get(controller.verifyOtp)
router.route('/createResetSession').get(controller.createResetSession)

/** put module */
router.route('/updateuser').put(controller.updateUser);
router.route('/resetPassword').put(controller.resetPassword);





export default router;