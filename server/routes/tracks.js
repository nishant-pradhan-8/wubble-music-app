const express = require("express")
const app = express();
const router = express.Router();
const {getTracks} = require('../controllers/trackController')
router.get("/",getTracks)

module.exports = router;