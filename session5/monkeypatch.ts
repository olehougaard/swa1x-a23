let m: number = 4
let n: number = 3

interface Number {
    power(n: number): number
}

Number.prototype.power = function(n: number): number {
    if (!Number.isInteger(n) || n < 0)
        return NaN
    else if (n === 0)
        return 1
    else if (n % 2 === 0)
        return (this * this).power(n / 2)
    else   
        return this * this.power(n - 1)
}

console.log(m.power(n))

console.log((2).power(10))
