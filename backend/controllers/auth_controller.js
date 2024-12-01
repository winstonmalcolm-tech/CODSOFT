const mysql = require("../configs/db_config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateTokens = require("../utils/generate_token");

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error("Please fill all fields");
        }

        let sql = "SELECT 'Recruiter' AS user_type, recruiter_tbl.* FROM recruiter_tbl WHERE email_address = ?;";

        let [rows] = await mysql.query(sql, [email]);

        if (rows.length < 1) {
            sql = "SELECT 'Applicant' AS user_type, applicant_tbl.* FROM applicant_tbl WHERE email = ?;";
            [rows] = await mysql.query(sql, [email]);
            
            if (rows.length < 1) {
                res.status(404);
                throw new Error("Not found");
            }
        }

        const result = rows[0];

        if (!(await bcrypt.compare(password, result.password_str))) {
            res.status(400);
            throw new Error("Incorrect credentials");
        }

        const userID = (result.user_type == "Recruiter") ? result.recruiter_id : result.applicant_id;
        sql = (result.user_type == "Recruiter") ? "UPDATE recruiter_tbl SET refresh_token = ? WHERE recruiter_id = ?" : "UPDATE applicant_tbl SET refresh_token = ? WHERE applicant_id = ?";
        
        const {accessToken, refreshToken} = generateTokens(userID);

        await mysql.query(sql, [refreshToken, userID]);

        const data = {
            "user_type": result.user_type,
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }

        res.status(200).json({message: "Login successful", result: data});

    } catch (error) {
        next(error.message);
    }
}

const refreshToken = async (req, res, next) => {

    try {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            res.status(400);
            throw new Error("Please enter refresh token");
        }

        let sql = "SELECT 'Recruiter' AS user_type, recruiter_tbl.* FROM recruiter_tbl WHERE refresh_token = ?;";
        
        let [rows] = await mysql.query(sql, [refreshToken]);

        if (rows.length < 1) {
            sql = "SELECT 'Applicant' AS user_type, applicant_tbl.* FROM applicant_tbl WHERE refresh_token = ?;";
            [rows] = await mysql.query(sql, [refreshToken]);

            if (!rows || rows.length < 1) {
                res.status(403);
                throw new Error("Session expired, please sign in again");
            }
        }

        const result = rows[0];


        jwt.verify(refreshToken, process.env.REFRESH_SECRET, function(err, decoded) {
            
            if (err) {
                res.status(403);
                throw new Error("Session expired, Please sign in again");
            }
        });


        const userID = (result.user_type == "Recruiter") ? result.recruiter_id : result.applicant_id;
        const {accessToken} = generateTokens(userID);

        res.status(200).json({accessToken: accessToken})
    } catch (error) {
        next(error.message);
    }
}


const logout = async (req, res, next) => {

    try {
        const {userType, refreshToken} = req.body;

        const sql = (userType == "Applicant") ? "UPDATE applicant_tbl SET refresh_token = '' WHERE refresh_token = ?; " : "UPDATE recruiter_tbl SET refresh_token = '' WHERE refresh_token = ?;";

        await mysql.query(sql, [refreshToken]);

        res.status(200).json({message: "Logged out sucessfully"});

    } catch (error) {
        next(error.message);
    }

}

module.exports = {login, refreshToken, logout};