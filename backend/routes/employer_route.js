const router = require("express").Router();
const { register, getRecruiter } = require("../controllers/employer_controller")
const protect = require("../middlewares/auth_middleware");

router.post("/", protect, getRecruiter);
router.post("/new", register);

module.exports = router;