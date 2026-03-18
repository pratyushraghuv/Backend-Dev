const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/register", (req, res) => {
    const { name, branch } = req.body;

    // Read existing data from file
    fs.readFile("students.json", "utf-8", (err, data) => {

        let students = [];

        if (!err && data) {
            students = JSON.parse(data);
        }

        const newStudent = {
            id: students.length + 1,
            name,
            branch
        };

        students.push(newStudent);

        // Write updated data back to file
        fs.writeFile("students.json", JSON.stringify(students, null, 2), (err) => {
            if (err) {
                return res.send("Error saving data");
            }

            res.send(`
                <h2>Student Registered Successfully</h2>
                <a href="/">Go Back</a>
            `);
        });

    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "form.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
