const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: true,
    auth: {
        user: "b73e772d84ccd2",
        pass: "f465b57c79c523"
    }
});

module.exports = transport;