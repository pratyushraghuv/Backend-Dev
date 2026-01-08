const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = {
        1: { name: "vanshraj", email: "Vraj@gmail.com", address: "Ghagra" },
        2: { name: "vanshraj", email: "Vraj@gmail.com", address: "Ghagra" }
      };

      const user = users[id];

      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    }, 1000); 
  });
};
fetchUser(1).then(user => console.log(user))