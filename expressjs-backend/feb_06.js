const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const PORT = 3000;


const data = {
    "1": {"name":"Krish","age":21,"city":"Delhi"},
    "2": {"name":"Riya","age":22,"city":"Mumbai"},
    "3": {"name":"Amit","age":20,"city":"Bangalore"},
    "4": {"name":"Sneha","age":23,"city":"Chennai"},
    "5": {"name":"Vikram","age":24,"city":"Kolkata"}

}
const loadData = ()=>{
    const raw = fs.readFileSync('E://Backend-Dev//Expressjs-backend//students.json','utf-8');
    const data = JSON.parse(raw);
    return data;
}

const writeData = (data)=>{
    fs.writeFileSync('E://Backend-Dev//Expressjs-backend//students.json',JSON.stringify(data));
}


app.post("/addStudent",(req,res)=>{

   const students = loadData();
   const { id,name,age,city } = req.body;
   const newStudent = {
       name,age,city
   }
   students[id]=newStudent;
   console.log(students);
   writeData(students);
   return res.json({"Message":
    "New Student Added!!"
   });  
});

app.put("/updateStudent/:id",(req,res)=>{
    
   const students = loadData();
   const { id } = req.params;
   const { name, age, city } = req.body;
   
   if(!students[id]){
       return res.status(404).json({"Message":"Student not found!!"});
   }
   
   const updatedStudent = {
       name: name || students[id].name,
       age: age || students[id].age,
       city: city || students[id].city
   }
   students[id] = updatedStudent;
   console.log(students);
   writeData(students);
   return res.json({"Message":"Student Updated!!"});
});

app.delete("/deleteStudent/:id",async(req,res)=>{
    
   const students = loadData();
   const { id } = req.params;
   
   if(!students[id]){
       return res.status(404).json({"Message":"Student not found!!"});
   }
   
   delete students[id];
   console.log(students);
   writeData(students);
   return res.json({"Message":"Student Deleted!!"});
});

app.listen(PORT,()=>{
    console.log(Array.__prototype__);
    console.log(loadData());
    console.log("Server is running on ${PORT}!!");
})