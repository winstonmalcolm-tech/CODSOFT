require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const errorHandler = require("./middlewares/error_handler_middleware");
const employerRoutes = require("./routes/employer_route");
const candidateRoutes = require("./routes/candidate_route");
const jobRoutes = require("./routes/job_route");
const authRoutes = require("./routes/auth_route");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use("/auth", authRoutes);
app.use("/recruiter", employerRoutes);
app.use("/candidate", candidateRoutes);
app.use("/job", jobRoutes);
app.use(errorHandler);


app.use(express.static(path.join(__dirname, "uploads")));


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));