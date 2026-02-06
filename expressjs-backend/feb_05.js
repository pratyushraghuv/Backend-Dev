const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 3000;

app.use(express.json());

const students = [
  { id: 1, name: "Pratyush", branch: "CSE" },
  { id: 2, name: "Vansh", branch: "ECE" },
  { id: 3, name: "Shivam", branch: "AeroSpace" },
];

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

const readStudentsFromFile = () => {
  try {
    const data = fs.readFileSync("./students.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading students.json:", err);
    return [];
  } 
};

const writeStudentsToFile = (students) => {
  try {
    fs.writeFileSync("./students.json", JSON.stringify(students, null, 2));
  } catch (err) {
    console.error("Error writing to students.json:", err);
  }
};

app.get("/students", (req, res) => {
  fs.readFile("./students.json", (err, data) => {
    if (err) {
      return res.status(500).send("Error occured");
    }
    return res.status(200).json(JSON.parse(data));
  });
  return res.json(students);
});


app.get("/students/search", (req, res) => {
  const { name, branch } = req.query;
  let filteredStudents = students;

  if (name) {
    filteredStudents = filteredStudents.filter((student) =>
      student.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (branch) {
    filteredStudents = filteredStudents.filter(
      (student) => student.branch.toLowerCase() === branch.toLowerCase(),
    );
  }

  if (filteredStudents.length === 0) {
    return res.status(404).json({ message: "Student's data not found in database" });
  }

  res.json(filteredStudents);
});


// GET → Fetch student by ID (Route Params)
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student's data not found in database" });
  }

  res.json(student);
});


// Used to create new data
app.post("/students/register", (req, res) => {
  const { name, branch } = req.body;

  if (!name || !branch) {
    return res.status(400).send("Details Missing");
  }

  fs.readFile("./students.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Could not read file" });
    }
    const students = JSON.parse(data || "[]");

    const newStudent = {
      id: students.length ? students[students.length - 1].id + 1 : 1,
      name,
      branch,
    };

    students.push(newStudent);

    fs.writeFile(
      "./students.json",
      JSON.stringify(students, null, 2),
      (err) => {
        if (err) {
          return res.status(500).send("Error writing to file");
        }
        return res.status(201).json({message: "Student registered successfully", student: newStudent});
      },
    );
  });
});


// Used to update existing data

// app.put("/students/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const { name, branch } = req.body;

//   const studentIndex = students.findIndex((s) => s.id === id);

//   if (studentIndex === -1) {
//     return res.status(404).json({ message: "Student's data not found in database" });
//   }

//   if (!name && !branch) {
//     return res.status(400).json({ message: "Provide at least one field to update" });
//   }

//   if (name) students[studentIndex].name = name;
//   if (branch) students[studentIndex].branch = branch;

//   res.status(200).json({message: "Student updated successfully", student: students[studentIndex]});
// });


// PUT → Update using spread operator
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student's data not found in database" });
  }

  students[studentIndex] = {...students[studentIndex], ...req.body};

  res.status(200).json({message: "Student updated successfully", student: students[studentIndex]});
});


// Used to delete existing data
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student's data not found in database" });
  }

  // Remove student from array
  const deletedStudent = students.splice(studentIndex, 1);

  res.status(200).json({message: "Student deleted successfully", student: deletedStudent[0]});
});




app.listen(PORT, () => {
  console.log(`Server is listening on port : ${PORT}`);
});