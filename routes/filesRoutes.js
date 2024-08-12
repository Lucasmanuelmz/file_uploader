const {Router} = require('express');
const uploadFilesController = require('../controllers/uploadFiles');
const filesRouter = Router();

filesRouter.post('/uploads', uploadFilesController.uploadFiles)
module.exports = filesRouter;