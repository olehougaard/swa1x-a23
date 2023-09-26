function Person(name, cpr, address, birthday) {
    this.name = name;
    this.cpr = cpr;
    this.address = address;
    this.birthday = birthday;
}
Person.prototype.getName = function () {
    return this.name;
};
Person.prototype.getCpr = function () {
    return this.cpr;
};
Person.prototype.getAddress = function () {
    return this.address;
};
Person.prototype.setAddress = function (address) {
    this.address = address;
};
Person.prototype.getBirthday = function () {
    return this.birthday;
};
Person.prototype.getCprGender = function () {
    var lastDigit = parseInt(this.cpr.charAt(this.cpr.length - 1));
    if (lastDigit % 2 == 0)
        return "Female";
    else
        return "Male";
};

function Employee(name, cpr, address, birthday, salary) {
    Person.call(this, name, cpr, address, birthday);
    this.salary = salary;
}

Object.setPrototypeOf(Employee.prototype, Person.prototype)

Employee.prototype.getSalary = function () {
    return this.salary;
};
Employee.prototype.giveRaise = function (raise) {
    this.salary += raise;
};
