type Sizable = {
    getSize(): number
}

type Sized = {
    getSize(): number
}

function size(s: Sizable): number {
    return s.getSize()
}

const z: Sized = { 
    getSize() {
        return 42 
    }
}

console.log(size(z))
