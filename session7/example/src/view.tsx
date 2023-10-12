import * as React from 'react'
import { useState } from 'react'
import { Model, Data } from './model'
import {Dispatcher} from './dispatcher'

type Props = {person: Data, dispatcher: Dispatcher}

const EmployeeData = ({person: {id, employeeId, salary, manager}, dispatcher}: Props): React.ReactElement[] => {
    if (employeeId) 
        return [<td key='empId'>{employeeId}</td>, <td key='salary'>{salary!}</td>, <td key='manager'>{manager!.toString()}</td>]
    else
        return [<td colSpan={3} key='hire'>
            <button onClick = {() => dispatcher({type:'hire', id})}>Hire</button>
        </td>]
}

const PersonData = ({person, dispatcher}: Props): React.ReactElement[] => [
    <td key='id'>{person.id}</td>,
    <td key='name'>{person.name}</td>,
    ...EmployeeData({person, dispatcher})
] 

const PersonRow = (props: Props) => (
    <tr key={props.person.id}>
        {PersonData(props)}
    </tr>
)

const PersonDataBody = ({data: model, dispatcher}: { data: Data[], dispatcher: Dispatcher }) => {
    return <tbody>
        {
            model.map((person: Data) => <PersonRow key={person.id.toString()} {...{person, dispatcher}}/>)
        }
    </tbody>
}

const sortOrder = (a: any, b: any) => {
    if (a < b)
        return -1
    else if (a === b)
        return 0
    else
        return 1
}

const keySortOrder = (key: keyof Data) => (a: Data, b: Data) => sortOrder(a[key], b[key])

const sortBy = (key: keyof Data) => (a: Data[]) => {
    let b = [...a]
    b.sort(keySortOrder(key))
    return b
}

const identity = (a: Data[]) => a

const App = ({model, dispatcher}: { model: Model, dispatcher: Dispatcher }) => {
    const [sort, setSort] = useState(() => identity)
    const data = sort(model.personData())

    function defSort(key: keyof Data) {
        setSort(() => sortBy(key))
    }

    return <div id='base'>
        <h1>People</h1>
        <table id='employees'>
            <thead><tr><td onClick={ _ => defSort('id') }>Id</td><td onClick={ _ => defSort('name')} >Name</td><td>Employee id</td><td>Salary</td><td>Manager</td></tr></thead>
            <PersonDataBody data={data} dispatcher={dispatcher}/>
        </table>
    </div>
}

export default (dispatcher: Dispatcher) => (model: Model) => <App model = {model} dispatcher={dispatcher}/>
