// Untyped
let x = '7'
x = 7

// Flexible
console.log(7 * "7")

console.log(7 * "seven")

console.log(7 * "seven" == NaN)

console.log(7 == "7")
console.log(7 === "7")

// Creating an object

let a = { x: 100, y: 200}
let b = { x: 100, y: 200}
console.log(a === b)
console.log(a.x)
let c = b
console.log(c === b)

console.log(a.z)
//console.log(a.z.q)
console.log((199).toString())

a.z = 50
console.log(a.z)
delete a.z
console.log(a.z)
