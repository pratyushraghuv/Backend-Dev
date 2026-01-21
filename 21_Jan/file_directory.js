const { log } = require('console');
const fs = require('fs');

fs.mkdir("newDirectory", (err)=>{
    if(err) return;
    console.log("Directory Created");
    
})
fs.mkdir("folders/folder1/folder2", { recursive: true },(err)=>{
    if(err){
        console.log("Directory creation failed",err);
        return;
    }
    else{
        console.log("Directory created");
    }
})

fs.rmdir("newDirectory", (err)=>{ //removes empty folder
    if(err){
        console.log(err); return
    }
    console.log("directory is removed");
})

// fs.rm("newDirectory",{recursive: true}, (err)=>{ // removes folder with files
//     if(err){
//         console.log(err); return
//         ;
//     }
//     console.log("directory is removed");
// })