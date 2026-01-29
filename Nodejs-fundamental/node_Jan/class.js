//Please Solve these commonly asked  JS interview questions

// //Q1;
// const obj = { a: "one", b: "two", a: "three" };
// console.log(obj);

// //Q2;
// const a = {};
// const b = { key: "b" };
// const c = { key: "c" };

// a[b] = 123;
// a[c] = 456;

// console.log(a[b]);

// //Q3;

// const user = { name: "Lydia", age: 21 };
// const admin = { admin: true, ...user };
// console.log(admin);

// //Q4;
// const shape = {
//   radius: 10,
//   diameter() {
//     return this.radius * 2;
//   },
//   perimeter: () => 2 * Math.PI * this.radius,
// };

// console.log(shape.diameter());
// console.log(shape.perimeter());

// //Q5
// function test() {
//     console.log(a);
//     console.log(b);
   
//     var a = 10;
//     let b = 20;
// }
// test();

//Q 6

var x = 10;
if (true) {
  var x = 20;
  console.log(x);
}
console.log(x);

let y = 10;
if (true) {
  let y = 20;
  console.log(y);
}
console.log(y);