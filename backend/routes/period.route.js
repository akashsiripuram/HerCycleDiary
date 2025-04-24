const { addPeriod,getPeriods } = require("../controllers/period.controller");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/", verifyToken,addPeriod);
router.get("/",verifyToken,getPeriods);

module.exports = router;