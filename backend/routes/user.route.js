const { createUser, loginUser, getUser } = require("../controllers/auth.controller");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/signup", createUser);
router.post("/login",loginUser);
router.get("/get-user",verifyToken,getUser)
module.exports = router;