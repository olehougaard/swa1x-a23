let obj = {
    x: 100,
    y: 200
}

let obj2 = {
    x: 100,
    y: 200
}

let obj3 = obj2

console.log(obj === obj2)
console.log(obj3 === obj2)

console.log(obj.x)
console.log(obj.z)

obj.z = 'Hello, World!'
console.log(obj.z)

delete obj.z
console.log(obj.z)
