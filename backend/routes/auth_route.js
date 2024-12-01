const router = require("express").Router();
const {login, refreshToken, logout} = require("../controllers/auth_controller");

router.post("/login", login);
router.post("/logout", logout);
router.post("/refreshtoken", refreshToken);

module.exports = router;