const express = require('express');
const app = express();

const user = [
    {"name":"Krish","age":19,"branch":"CSE"},
    {"name":"Pratyush","age":22,"branch":"Mech"}
];

app.get('/', (req, res) => {
    res.send("Welcome to the Home Page");
});

app.get('/user', (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(404).send("Provide me the correct id");
    }
    res.status(200).json(user[id]);
});

app.get('/branch',(req,res)=>{
    const branch = req.query.branch;
    if(!branch) return res.status(404).send("Provide me the correct branchh");

    const data = user.filter(student=>student.branch===branch);
    return res.json(data);
})

app.listen(4000, () => {
    console.log("Server is running.");
});