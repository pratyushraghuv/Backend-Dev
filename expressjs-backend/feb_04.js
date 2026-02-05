// const express = require('express');
// const app = express();

// app.use(express.json());
// const PORT = 3000;

// const students = [
//     { name: "Pratyush", age: 19, branch: "CSE" },
//     { name: "Vansh", age: 22, branch: "CSE" }
// ];

// app.get('/', (req, res) => {
//     res.send("Welcome to Home Page");
// });

// app.get('/user', (req, res) => {
//     const id = Number(req.query.id);
//     if (isNaN(id) || id < 0 || id >= students.length) {
//         return res.status(404).json({ message: "Student not found" });
//     }

//     res.json(students[id]);
// });

// app.get('/branch', (req, res) => {
//     const branch = req.query.branch;

//     if (!branch || branch.trim() === "") {
//         return res.status(400).json({ message: "Branch is required" });
//     }

//     const data = students.filter(
//         student => student.branch.toLowerCase() === branch.toLowerCase()
//     );
//     if (data.length === 0) {
//         return res.status(404).json({ message: "No students found" });
//     }
//     res.json(data);
// });

// app.post('/students/register', (req, res) => {
//     const { name, age, branch } = req.body;

//     if (!name || !branch || typeof age !== "number") {
//         return res.status(400).json({ message: "Valid name, age, branch required" });
//     }
//     const student = { name, age, branch };
//     students.push(student);

//     res.status(201).json(student);
// });

// app.put('/students/update/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const { name, age, branch } = req.body;

//     if (isNaN(id) || id < 0 || id >= students.length) {
//         return res.status(404).json({ message: "Student not found" });
//     }
//     if (!name || !branch || typeof age !== "number") {
//         return res.status(400).json({ message: "Valid name, age, branch required" });
//     }
//     students[id] = { name, age, branch };

//     res.json(students[id]);
// });
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// const users =   {
//     1:{name:"Pratyush",age:"29"},
//     2:{name:"Vansh",age:"26"}
// };



app.get("/getUser/:id",(req,res)=>{
    const id = req.params.id;
    //console.log(id);
    //console.log(typeof(id));

    if(!id || !users[id]) return res.status(404).json({"message":"User not found"});
    return res.json(users[id]);
})

app.put("/changeAge",(req,res)=>{
    const { id,age } = req.body;
    //console.log(id);
    //console.log(typeof(id));
    if (!id || !users[id]) return res.status(404).json({"message":"User not available"});

    const user = users[id];
    console.log(user);
    user.age = age;
    return res.status(201).json({"message":"Changed the age!!"});
})

app.post("/students/register",(req,res)=> {
    const {name, branch} = req.body;
    if(!name || !branch) return res.status(400).json({"message":"name and branch are required"});

    fs.readfile('./students.json','utf-8',(err,data)=>{
        if(err) return res.status(500).json({"message":"Internal Server Error"});

        const students = JSON.parse(data|| '[]');

        const newStudent = {
            id: students.length >0 ? students[students.length -1].id +1 : 1,
            name,
            branch
        }
        students.push(newStudent);

        fs.writeFile('./students.json',JSON.stringify(students, null, 2),(err)=>{
            if(err) return res.status(500).json({"message":"Internal Server Error"});   
            return res.status(201).json({"message":"Student registered successfully",student:newStudent});
        });
    });

});



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}.`);
});