const mongoose = require("mongoose");
const fs = require("fs");
const Scheme = require("./models/scheme"); // Make sure path is correct

mongoose.connect("mongodb://127.0.0.1:27017/gov_schemes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

async function seedDB() {
    // Clear existing data
    await Scheme.deleteMany({});

    // Load CSV
    const csv = fs.readFileSync("C:/cprogram/Fin-Wise-web-app/ml_api/data/updated_data.csv", "utf-8");
    const lines = csv.split("\n");
    const headers = lines[0].split(",");

    const schemes = lines.slice(1).map(line => {
        const data = line.split(",");
        return {
            name: data[headers.indexOf("scheme_name")] || "",
            benefits: data[headers.indexOf("benefits")] || "",
            documents: data[headers.indexOf("documents")] ? data[headers.indexOf("documents")].split(";") : [],
            apply_link: data[headers.indexOf("application")] || "",
            // Optional eligibility data
            age_min: 0,
            age_max: 100,
            income_max: 10000000,
            occupation: "any",
            state: "any"
        };
    });

    await Scheme.insertMany(schemes);
    console.log("MongoDB seeded!");
    mongoose.connection.close();
}

seedDB();
