function createObj(x, y) {
    function getX() { return x}
    function setX(_x) { x = _x}
    const getY = () => y
    const total = () => x + y
    return { getX, setX, getY, total}
}

// 1. Parameters for constructor => parameters for function
// 2. Additional instance variables => local variables
// 3. Methods => local functions
// 4. Return an object with all public members

let obj = createObj(11, 47)
console.log(obj.getX())
obj.setX(110)
console.log(obj.total())

let goodTotal = obj.total
console.log(goodTotal())

// Constructor alternative
function Obj(x, y) {
    this.getX = function () { return x}
    this.setX = function (_x) { x = _x}
    this.getY = () => y
    this.total = () => x + y
}

const obj2 = new Obj(47, 11)
