const {Router} = require('express');
const userController = require('../controllers/userControllers');
const userRouter = Router();

userRouter.get('/login', userController.userRenderLogin);
userRouter.post('/login', userController.userLogin);
userRouter.post('/signup', userController.createUser);
userRouter.get('/signup', userController.renderSignupUser);


module.exports = userRouter;