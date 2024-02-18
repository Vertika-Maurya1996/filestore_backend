var express = require('express');
var router = express.Router();
const UserController = require("../controllers/UserController")
const FileController = require("../controllers/FileController");


router.post('/register',UserController.userRegister);
router.post('/verifyCode',FileController.verifyCode)
router.post('/delete',FileController.deleteFile)
router.post('/getUserDetails',UserController.getUserDetails)

module.exports = router;
