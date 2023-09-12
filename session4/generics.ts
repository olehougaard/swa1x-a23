function identityNaive(x: unknown) {
    return x
}

const u = identityNaive("Hello") // Without generics, type of s is unknown

type Vector = {
    dx: number,
    dy: number
}

function nCopies<T>(n: number, value: T): T[] {
    const copies = new Array<T>(n)
    for(let i: number = 0; i < n; i++) {
        copies[i] = value
    }
    return copies
}

const hellos = nCopies(7, "Hello")

type ColoredVector = Vector & { color: number }

function transposeNaive(v: Vector) {
    const temp = v.dx
    v.dx = v.dy
    v.dy = temp
    return v
}

let cv: ColoredVector = {dx: 10, dy: 22, color: 0x3248f9}

const v = transposeNaive(cv)

