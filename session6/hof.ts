// Higher-order functions

type Pet = { type: string, name: string, age: number }

const pets: Pet[] = [
    {type: 'dog', name:'Fido', age: 7}, 
    {type: 'cat', name: 'Hannibal', age: 2}, 
    {type: 'dog', name: 'Rover', age: 3},
    {type: 'dragon', name: 'Fluffykins', age: 673}]

function namesOf(pets: Pet[]): string[] {
    let names: string[] = []
    for(let pet of pets) {
        names.push(pet.name)
    }
    return names
}

function agesOf(pets: Pet[]): number[] {
    let names: number[] = []
    for(let pet of pets) {
        names.push(pet.age)
    }
    return names
}

function map<T, U>(xs: T[], f: (_: T) => U): U[] {
    let names: U[] = []
    for(let x of xs) {
        names.push(f(x))
    }
    return names
}

console.log(map(pets, (p: Pet) => p.age))
console.log(map(pets, p => p.name))

console.log(pets.map(p => p.age))

function ofType(pets: Pet[], type: string): Pet[] {
    let names: Pet[] = []
    for(let pet of pets) {
        if (pet.type === type)
            names.push(pet)
    }
    return names
}

function filter<T>(pets: T[], p: (_:T) => boolean): T[] {
    let names: T[] = []
    for(let pet of pets) {
        if (p(pet))
            names.push(pet)
    }
    return names
}

console.log(pets.filter(p => p.type === 'dragon').map(p => p.age))

function sumOfAges(ps: Pet[]): number {
    let sum = 0;
    for(let p of ps) {
        sum = sum + p.age
    }
    return sum
}

function reduce<T, U>(
      ps: T[], 
      initialValue: U, 
      f: (accumulator: U, p: T) => U): U {
    let acc = initialValue;
    for(let p of ps) {
        acc = f(acc, p)
    }
    return acc
}

console.log(reduce(pets, 0, (acc, p) => acc + p.age))
console.log(pets.map(p=>p.age).reduce((acc, age) => acc + age, 0))

// Also higher-order (returns a function):
function add(n:number) {
    return function(m: number) {
        return n + m
    }
}

const a = [1, 2, 3, 4]
const a_plus_1 = a.map(add(1))

