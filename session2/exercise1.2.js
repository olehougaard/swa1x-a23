function Point(x, y) {
    const getX = () => x
    const getY = () => y
    const moveTo = (_x, _y) => {
        x = _x
        y = _y
    }
    const toString = `(${x}, ${y})`

    /*
    return {
        getX: getX,
        getY: getY,
        moveTo: moveTo,
        toString: toString
    }
    */
   return { getX, getY, moveTo, toString }
}

/*
    function Circle(arg1, arg2, arg3) {
        let center
        let radius
        if (arg3 === undefined) {
            center = arg1
            radius = arg2
        } else {
            center = Point(arg1, arg2)
            radius = arg3
        }

        // and so on...
    }
*/

function Circle({center, x, y, radius}) {
    center = center ?? Point(x, y)
    // center ??= Point(x, y)
    const getCenterX = () => center.getX()
    const getCenterY = () => center.getY()
    const getRadius = () => radius
    const moveCenterTo = (x, y) => {
        center.moveTo(x, y)
    }
    const toString = () => `${center.toString()}+${radius}`

    return { getCenterX, getCenterY, getRadius, moveCenterTo, toString }
}

const c1 = Circle({center: Point(40, 50), radius: 22})
const c2 = Circle({x: 40, y: 50, radius: 22})
