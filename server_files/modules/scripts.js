import { returnHi, age, last} from "./utils.js";
// we can change the person to anything if it default export but not in named export.
import personDetails from "./handlers.js";
import {callForHelp} from "./handlers.js";
// on demand modules.

 const btn = document.querySelector('button');
 console.log(btn);
 btn.addEventListener('click', callForHelp)
const name = "sharukh";

// here we want to use returnHi function from utils.js

// method 1.
//console.log(returnHi(name));

console.log(returnHi(name));
console.log(age, last);
console.log(personDetails);

// visit mdn import