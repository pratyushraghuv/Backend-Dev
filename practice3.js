// let user;
// setTimeout(() => {
// user={
//     name:"abc",
//     addres:"Mathura"
// }
//     console.log("I am");

    

// },0);

// //console.log(user);

// const fetchuser=()=>{
//     return new Promise((resolve,reject)=> {
//         const user1={1:{name:"abh", email:"vaibhav123@gmaail.com", phone:"8709888080",address:"Mathura"}}

//     })
// }

//  user=users[userId]
//  if(user){
//     resolve(user);
//  }
//  else{
//     reject("not found");
//  }


let user;

setTimeout(() => {
  user = {
    name: "Motu",
    address: "Agra"
  };
  console.log("I am");
}, 0);

console.log(user);

const fetchUser = (userId) => {
  return new Promise((resolve, reject) => {

    const users = {
      1: {
        name: "vanshu",
        email: "van123@gmail.com",
        phone: "8709888080",
        address: "Delhi"
      }

    };

    const user = users[userId];

    if (user) {
      resolve(user);
    } else {
      reject("User not found");
    }
  });
};

fetchUser(1)
  .then(user => {
    console.log("Fetched User:", user);
  })
  .catch(error => {
    console.log(error);
  });