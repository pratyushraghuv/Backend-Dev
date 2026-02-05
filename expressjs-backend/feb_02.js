const express = require('express');
const app = express();

const PORT = 3000;
app.use(express.json());

const user = [
    {"name":"Pratyush","age":29,"branch":"CSE"},
    {"name":"Vansh","age":26,"branch":"Mech"}
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

app.post('/students/register', (req, res) => {
    const { name, age, branch } = req.body;

    if (!name || !age || !branch) {
        return res.status(400).json({
            message: "name, age, and branch are required"
        });
    }
    
    const student = { name, age, branch };

    user.push(student);

    return res.status(201).json({
        message: "Student added successfully",
        user
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});