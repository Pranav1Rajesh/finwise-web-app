const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const schemesRoutes = require("./routes/schemes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/gov_schemes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/api/schemes", schemesRoutes);

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
