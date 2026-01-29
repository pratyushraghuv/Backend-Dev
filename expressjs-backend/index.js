
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const students = [
    {
    id: 1,
    name: "Pratyush",
    branch: "CSE"
    },
    {
    id: 2,
    name: "Vansh",
    branch: "CSE"
    },
    {
    id: 3,
    name: "Shivam",
    branch: "CSE"
    }
];

app.get("/", (req, res) => {
  res.send("welcome to the home page");
});

app.get("/students" , (req, res) => {
    res.json(students);
});

app.get("/students/:id" , (req, res) => {
    res.send("");
});
app.get("students/search",(req,res) =>{
    const searchQuery = req.query;
    
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});