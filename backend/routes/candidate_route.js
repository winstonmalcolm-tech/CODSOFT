const router = require("express").Router();
const { register, uploadResume, getApplicant } = require("../controllers/candidate_controller");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        const id = req.body.applicantId;

        const directory = `uploads/${id}`;

        await fs.mkdir(directory, {recursive: true});

        cb(null, directory);

    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});


router.get("/:applicantId", getApplicant);
router.post("/new", register);

router.post("/resumeupload", upload.single("resume"), uploadResume);

module.exports = router;