const router = require("express").Router();
const { apply, applied, jobsAppliedFor, displayJobProspects, getJob, search, listJobs, listFeaturedJobs, postJob, deleteJob, editJob, recruiterjobs, getJobProspectsCount, acceptApplicant, rejectApplicant } = require("../controllers/job_controller");
const protect = require("../middlewares/auth_middleware");

router.get("/search", search);
router.get("/listjobs", listJobs);
router.get("/listfeaturedjobs", listFeaturedJobs);
router.get("/:jobId", getJob);
router.post("/applied", applied)
router.post("/apply/:jobId", protect, apply);

router.get("/recruiterjobs/:recruiterId", protect, recruiterjobs);
router.post("/post", protect, postJob);
router.put("/edit/:jobId", editJob);
router.delete("/delete/:jobId", protect, deleteJob);
router.get("/jobsappliedfor/:applicantId", protect, jobsAppliedFor);
router.get("/jobprospects/:recruiterId", protect, displayJobProspects);
router.get("/prospectscount/:recruiterId", protect, getJobProspectsCount);
router.post("/accept", protect, acceptApplicant);
router.post("/reject", protect, rejectApplicant);

module.exports = router;