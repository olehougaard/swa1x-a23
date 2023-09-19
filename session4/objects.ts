type Obj = {
    x: number
    y: number
    z?: string
}

let obj: Obj = {
    x: 100,
    y: 200
}

type Obj2 = {
    x: number
    y: number
}

let obj2: Obj2 = {
    x: 100,
    y: 200
}

let obj3: Obj2 = obj

console.log(obj === obj2)
console.log(obj3 === obj2)

console.log(obj.x)
console.log(obj.z)

obj.z = 'Hello, World!'
console.log(obj.z)

delete obj.z
console.log(obj.z)
