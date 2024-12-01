const mysql = require("../configs/db_config");
const bcrypt = require("bcryptjs");

const register = async (req,res,next) => {

    try {
        const { firstName, lastName, profession, companyName, companyIndustry, companySize, location, email, password} = req.body;

        if(!firstName || !lastName || !profession || !companyName || !companyIndustry || !companySize || !location || !email || !password) {
            res.status(400);
            throw new Error("Please fill all fields");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO recruiter_tbl (first_name, last_name, profession, company_name, company_industry, company_size, location, email_address, password_str) VALUES (?,?,?,?,?,?,?,?,?);";

        const [result] = await mysql.query(sql, [firstName, lastName, profession, companyName, companyIndustry, companySize, location, email, hashedPassword]);
        
        res.status(201).json({message: "Created successfully", id: result.insertId});

    } catch(error) {
        res.status(500);
        next(error.message);
    }
}

const getRecruiter = async (req, res, next) => {
    try {

        const sql = "SELECT * FROM recruiter_tbl WHERE recruiter_id = ?";

        const [rows] = await mysql.query(sql, [req.id]);

        res.status(200).json({recruiter: rows[0]});
    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    register,
    getRecruiter
}
