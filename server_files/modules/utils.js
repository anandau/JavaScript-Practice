export function returnHi(name) {
    console.log(`hi ${name}`);
}

const last = "khan";
const age = 24;

// Named Export we can as many as possible.
// but we can have only one export default go to handlers.js.
export {last, age};