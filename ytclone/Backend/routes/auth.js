const express = require("express");
const {signup, signin,googleAuth } = require("../controllers/auth")
const router = express.Router()

//CREATE A USER

router.post("/signup", signup )

//SIGN IN
router.post("/signin", signin)

//GOOGLR AUTH

router.post("/google",googleAuth )

module.exports = router;