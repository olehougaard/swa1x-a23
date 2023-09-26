class Person {
    constructor(name, cpr, address, birthday) {
        this.name = name;
        this.cpr = cpr;
        this.address = address;
        this.birthday = birthday;
    }
    getName() {
        return this.name;
    }
    getCpr() {
        return this.cpr;
    }
    getAddress() {
        return this.address;
    }
    setAddress(address) {
        this.address = address;
    }
    getBirthday() {
        return this.birthday;
    }
    getCprGender() {
        let lastDigit = parseInt(this.cpr.charAt(this.cpr.length - 1));
        if (lastDigit % 2 == 0)
            return "Female";
        else
            return "Male";
    }
}
class Employee extends Person {
    constructor(name, cpr, address, birthday, salary) {
        super(name, cpr, address, birthday);
        this.salary = salary;
    }
    getSalary() {
        return this.salary;
    }
    giveRaise(raise) {
        this.salary += raise;
    }
}
function f(e) {
    console.log(e.getSalary());
}
