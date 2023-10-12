import { Model, Employee, Person } from './model'

export type Listener = (_:Model) => void
export type Action = 
      { type: 'hire', employee: Employee, person: Person }
    | { type: 'none' }

export type Store = {
  subscribe(listener: Listener): () => void
  dispatch(action: Action): void
}

export default (init_model: Model): Store => {
  let model = init_model
  const observers: Listener[] = []

  function reducer(model: Model, action: Action) {
    // Narrowing
    switch(action.type) {
      case 'hire':
        const { employee, person } = action
        return model.addEmployee(employee).updatePerson(person)

      default:
        return model
    }
  }

  const subscribe = (observer: Listener) => {
    observers.push(observer)
    const unsubscribe = () => {
      const index = observers.indexOf(observer)
      if (index !== -1) observers.splice(index, 1)
    }
    return unsubscribe
  }

  const dispatch = (action: Action ) => {
    model = reducer(model, action)
    observers.forEach(o => o(model))
  }

  return { subscribe, dispatch }
}
