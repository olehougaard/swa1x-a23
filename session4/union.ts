type Person = {name: string, age: number | undefined}

type Pet = "dog" | "cat" | "goldfish"

function expectedAge(p: Pet): void {
    switch(p) {
        case "dog": 
            console.log(12)
            break;
        case "cat": 
            console.log(10)
            break;
        case "goldfish":
            console.log(1)
    }
} 

function birthday(p: Person): Person {
    if (p.age === undefined)
        return {name: p.name, age: 1}
    return {name: p.name, age: p.age + 1}
}

type User = { type: "administrator", password: "password"} | {type: "clerk", salary: number}

