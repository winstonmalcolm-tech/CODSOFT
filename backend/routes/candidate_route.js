const router = require("express").Router();
const { register, uploadResume, getApplicant } = require("../controllers/candidate_controller");
const multer = require("multer");
const protect = require("../middlewares/auth_middleware");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const id = req.params.applicantId;
        
        const dir = `upload/${id}`;

        if (fs.existsSync(dir)) {
            fs.rmSync(dir, {recursive: true}, err => {
                if (err) {
                    throw err;
                }
            });
        }

        fs.mkdirSync(dir, {recursive: true}, err => {
            if (err) {
                throw err;
            }
        });

        cb(null, dir);

    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.replace(" ", ""));
    }
});

const upload = multer({storage});


router.get("/:applicantId", protect, getApplicant);
router.post("/new", register);

router.post("/resumeupload/:applicantId", protect, upload.single("resume"), uploadResume);

module.exports = router;