const mysql = require("../configs/db_config");

const apply = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const { applicantId } = req.body;

        let sql = "SELECT resume_url FROM applicant_tbl WHERE applicant_id = ? LIMIT 1";

        const [rows] = await mysql.query(sql, [applicantId]);   

        const applicant = rows[0];

        if (!applicant.resume_url || applicant.resume_url == "") {
            throw new Error("Go to profile and upload a resume");
        }
        
        sql = "INSERT INTO job_application_tbl (job_id, applicant_id) VALUES (?,?);";

        await mysql.query(sql, [jobId, applicantId]);

        res.status(200).json({message: "Application sent"});

    } catch (error) {
        next(error.message);
    }
}

const applied = async (req, res, next) => {

    try {
        const { jobId, applicantId } = req.body;

        const sql = "SELECT * FROM job_application_tbl WHERE job_id = ? AND applicant_id = ? LIMIT 1;";

        const [rows] = await mysql.query(sql, [jobId, applicantId]);

        const isApplied = (rows.length > 0) ? true : false;

        res.status(200).json({applied: isApplied});

    } catch(error) {
        console.log(error)
        next(error.message);
    }
}



const recruiterjobs = async (req, res, next) => {

    try {
        const recruiterId = req.params.recruiterId;

        const sql = "SELECT * FROM job_tbl WHERE recruiter_id = ?;";

        const [rows] = await mysql.query(sql, [recruiterId]);

        res.status(200).json({jobs: rows});
    } catch (error) {
        next(error.message);
    }
}

const getJobProspectsCount = async (req, res, next) => {
    try {
        const recruiterId = req.params.recruiterId;

        const sql = "SELECT COUNT(application.applicant_id) AS 'number_of_applicants', job.job_title FROM job_application_tbl AS application LEFT JOIN job_tbl AS job ON application.job_id = job.job_id WHERE job.recruiter_id = ? group by job.job_title;";

        const [rows] = await mysql.query(sql, [recruiterId]);

        res.status(200).json({stats: rows});

    } catch (error) {
        next(error.message);
    }
}

const displayJobProspects = async (req, res, next) => {

    try {
        const recruiterId = req.params.recruiterId;

        const sql = 'SELECT application.applicant_id, application.job_id, job.recruiter_id, job.job_title, applicant.first_name, applicant.last_name, applicant.location, applicant.date_of_birth, applicant.resume_url, applicant.email FROM job_application_tbl as application JOIN job_tbl AS job, applicant_tbl AS applicant WHERE applicant.applicant_id = application.applicant_id AND job.job_id = application.job_id AND job.recruiter_id = ?;';

        const [rows] = await mysql.query(sql, [recruiterId]); 

        res.status(200).json({applicants: rows});
        
    } catch (error) {
        next(error.message);
    }
}

const acceptApplicant = async (req, res, next) => {
    try {
        const {jobTitle, companyName, firstName, lastName, email} = req.body;

        res.status(200).json({message: "Email Sent"})
    } catch (error) {
        next(error.message);
    }
}

const rejectApplicant = async (req, res, next) => {
    try {
        const {jobTitle, companyName, firstName, lastName, email} = req.body;

        res.status(200).json({message: "Email Sent"})
    } catch (error) {
        next(error.message);
    }
}


const jobsAppliedFor = async (req, res, next) => {

    try {
        const applicantId = req.params.applicantId;

        let sql = "SELECT a.application_id, r.company_name, j.* FROM job_application_tbl AS a, recruiter_tbl as r, job_tbl AS j WHERE r.recruiter_id = j.recruiter_id AND j.job_id = a.job_id AND a.applicant_id = ?;";

        const [rows] = await mysql.query(sql, [applicantId]);

        res.status(200).json({jobs: rows});
    } catch (error) {
        next(error.message);
    }
}

const postJob = async (req, res, next) => {

    try {

        const {recruiterId, jobTitle, jobType, requirements, qualifications, location, category, salary, datePosted } = req.body;
        
        if (!recruiterId || !jobTitle || !jobType || !requirements || !qualifications || !location || !category || !salary || !datePosted) {
            res.status(400);
            throw new Error("Please enter all fields")
        }

        const sql = "INSERT INTO job_tbl (recruiter_id, job_title, job_type, salary, requirements, qualifications, location, category, date_posted) VALUES (?,?,?,?,?,?,?,?,?);";

        await mysql.query(sql, [recruiterId, jobTitle, jobType, salary, requirements, qualifications, location, category, datePosted]);

        res.status(201).json({message: "Posted"});
    } catch (error) {
        next(error.message);
    }
}

//Delete Job
const deleteJob = async (req, res, next) => {

    try {
        const tables = ["job_tbl", "job_application_tbl"];
        const jobId = req.params.jobId;

        for (let i in tables) {

            const sql = `DELETE FROM ${tables[i]} WHERE job_id = ?`;
            await mysql.query(sql, [jobId]);
        }


        res.status(200).json({message: "Deleted successfully"});


    } catch (error) {
        next(error.message);
    }
}

const getJob = async (req, res, next) => {

    try {
        const jobId = req.params.jobId;

        const sql = "SELECT job.*, r.company_name FROM job_tbl AS job, recruiter_tbl as r WHERE r.recruiter_id = job.recruiter_id AND job_id = ? LIMIT 1";

        const [rows] = await mysql.query(sql, [jobId]);

        res.status(200).json({job: rows[0]});
    } catch (error) {
        next(error.message);
    }
}

const listJobs = async (req, res, next) => {

    try {
        const sql = "SELECT * FROM job_tbl";

        const [rows] = await mysql.query(sql);

        res.status(200).json({jobs: rows});

    } catch (error) {
        console.log(error);
        next(error.message);
    }
}

const listFeaturedJobs = async (req, res, next) => {

    try {
        const sql = "SELECT * FROM job_tbl ORDER BY RAND() LIMIT 4;";

        const [rows] = await mysql.query(sql);

        res.status(200).json({jobs: rows});
    } catch (error) {
        next(error.message);
    }
}

const editJob = async (req, res, next) => {

    try {
        const jobId = req.params.jobId;
        const {jobTitle, jobType, qualifications, requirements, salary, location, category} = req.body;

        const sql = "UPDATE job_tbl SET job_title = ?, job_type = ?, salary = ?, requirements = ?, qualifications = ?, location = ?, category = ? WHERE job_id = ?";

        await mysql.query(sql, [jobTitle, jobType, salary, requirements, qualifications, location, category, jobId]);

        res.status(200).json({message: "Updated successfully"});

    } catch (error) {
        next(error.message);
    }
}

const search = async (req, res, next) => {

    try {
        const search = req.query.q;

        const wildSearch = `%${search}%`;
        const sql = "SELECT * FROM job_tbl WHERE job_title LIKE ?";

        const [rows] = await mysql.query(sql, [wildSearch]);

        res.status(200).json(rows);
    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    apply,
    listJobs, 
    postJob,
    deleteJob,
    search,
    listFeaturedJobs,
    applied,
    editJob,
    getJob,
    recruiterjobs,
    jobsAppliedFor, 
    displayJobProspects,
    getJobProspectsCount,
    acceptApplicant,
    rejectApplicant,
}