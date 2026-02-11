const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "public")));

let students = [];


app.post("/register", (req, res) => {
    const { name, branch } = req.body;

    const newStudent = {
        id: students.length + 1,
        name,
        branch
    };

    students.push(newStudent);

    console.log(students);

    res.send(`
        <h2>Student Registered Successfull</h2>
        <a href="/">Go Back</a>
    `);
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
