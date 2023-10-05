type Person = {
  readonly name: string
  readonly age: number
}

// Or: 
// type Person = Readonly<{name: string, age: number}>

const createPerson = (name: string, age: number) => ({name, age})

type Company = {
  readonly name: string
  readonly address: string
  readonly employees: Readonly<Person[]>
}

const createCompany = (name: string, address: string, employees: Person[] = []): Company => 
  ({name, address, employees})

const addEmployee = (c: Company, e: Person) => createCompany(c.name, c.address, [...c.employees, e])

const removeEmployee = (c: Company, e: Person) => createCompany(c.name, c.address, c.employees.filter(ee => e.getName !== ee.getName))

let c = createCompany("Acme", "Acme Way 1")
c = addEmployee(c, new Person("", 8))
c = addEmployee(c, new Person("asdlkfj", 88))
