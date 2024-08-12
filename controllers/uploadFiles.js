const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDest = path.join(__dirname, '../src/uploads');

if(!fs.existsSync(uploadDest)) {
fs.mkdirSync(uploadDest, {recursive: true})
}
const storage = multer.diskStorage({

  destination: (req, File, cb) => {
    cb(null, uploadDest)
  },
  filename: (req, file, cb) => {
    const extensionFile = file.originalname.split('.').pop();
    const newFileName = require('crypto').randomBytes(8).toString('hex')
    
    cb(null, `${newFileName}.${extensionFile}`)
  }
})

const upload = multer({storage})
exports.uploadFiles = [upload.single('file'), 
asyncHandler(async(req, res) => {
  res.status(200).json({message: 'Arquivo enviado com sucesso!'})
})]