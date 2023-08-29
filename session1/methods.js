function addThat(a, b) {
    return a + b
}

console.log(addThat(2, 2))

const addThatToo = (a, b) => a + b

console.log(addThatToo(2, 2))

function addThisAndThat(a, b) {
    return this + a + b
}

console.log(addThisAndThat(3, 4))

function addThisAndThat(a, b) {
    return this + a + b
}

console.log(addThisAndThat(3, 4))

console.log(addThisAndThat.call(3, 4, 5))

function addThisXAndThat(a, b) {
    return this.x + a + b
}

let a = { x: 100, y: 200}

console.log(addThisXAndThat.call(a, 400, 500))
a.add = addThisXAndThat
console.log(a.add(400, 500))

let b = { 
    x: 100, 
    y: 200,
    toString: function() { return this.x + ', ' + this.y}
}
console.log(b.toString())

let badToString = b.toString
console.log(badToString())

let boundToString = b.toString.bind(b)
console.log(boundToString())

// Old-fashioned constructor
function B(x, y) {
    this.x = x
    this.y = y
    this.toString = function() { return this.x + ', ' + this.y}
}

let b2 = new B(100, 200)
console.log(b.toString() === b2.toString())
