import express from 'express';

import * as UserController from '../controllers/users';


const router = express.Router();

router.get('/authenticated', UserController.getAuthenticatedUser);

router.post('/signup', UserController.singUp);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

export default router; 