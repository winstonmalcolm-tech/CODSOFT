const mysql = require("../configs/db_config");
const bcrypt = require("bcryptjs");
const fs = require("fs/promises");

const register = async (req, res, next) => {

    try {
        const {firstName, lastName, location, dateOfBirth, email, password} = req.body;

        if (!firstName || !lastName || !location || !dateOfBirth || !email || !password) {
            res.status(400);
            throw new Error("Please fill all fields");
        }

        const sql = "INSERT INTO applicant_tbl (first_name, last_name, location, date_of_birth, email, password_str) VALUES (?,?,?,?,?,?);";

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await mysql.query(sql, [firstName, lastName, location, dateOfBirth, email, hashedPassword]);

        if (!result.insertId) {
            res.status(500);
            throw new Error("Error saving data");
        }
        res.status(201).json({message: "Created successfully", id: result.insertId});

    } catch (error) {
        next(error.message);
    }
}

const getApplicant = async (req, res, next) => {

    try {
        const applicantId = req.params.applicantId;

        const sql = "SELECT * FROM applicant_tbl WHERE applicant_id = ? LIMT 1";

        const [rows] = await mysql.query(sql, [applicantId]);

        res.status(200).json({applicant: rows[0]});
    } catch(error) {
        next(error.message);
    }
}



const uploadResume = async (req, res, next) => {

    try {
        const applicantId = req.params.applicantId;
        
        const resume = req.files.resume[0];

        if (!resume) {
            res.status(400);
            throw new Error("Please enter select a resume");
        }

        const newResume = `${req.protocol}://${req.hostname}:${process.env.PORT}/${resume.path}`;

        let sql = "SELECT resume_url FROM applicant_tbl WHERE applicant_id = ?";

        const [rows] = await mysql.query(sql, applicantId);

        const result = rows[0];

        if (!result.resume_url) {
            sql = "UPDATE applicant_tbl SET resume_url = ? WHERE applicant_id = ?";
            await mysql.query(sql, [newResume, applicantId]);

            return res.status(200).json({message: "Resume uploaded"});
        }

        await fs.unlink(result.resume_url);

        sql = "UPDATE applicant_tbl SET resume_url = ? WHERE applicant_id = ?";
        await mysql.query(sql, [newResume, applicantId]);

        return res.status(200).json({message: "Resume uploaded"});

    } catch (error) {
        next(error.message);
    }
}


module.exports = {
    register,
    uploadResume,
    getApplicant
}