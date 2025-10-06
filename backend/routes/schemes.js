const express = require("express");
const router = express.Router();
const axios = require("axios");
const Scheme = require("../models/scheme");
const UserQuery = require("../models/userQuery");

// POST /api/schemes
router.post("/", async (req, res) => {
    const { age, income, occupation, state } = req.body;

    try {
        // Call Python ML API to get scheme prediction
        const mlResponse = await axios.post("http://127.0.0.1:8000/predict", {
            age, income, occupation, state
        });

        const matchedSchemes = mlResponse.data.schemes;

        // Save query to UserQuery collection
        const userQuery = new UserQuery({
            user_input: JSON.stringify(req.body),
            matched_schemes: matchedSchemes
        });
        await userQuery.save();

        // Get full scheme details
        const schemes = await Scheme.find({ name: { $in: matchedSchemes } });
        res.json({ schemes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
