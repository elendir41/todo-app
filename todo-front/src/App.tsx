import './App.css'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
// import TestButton from './TestButton'

function App() {

  return (
    <main>
      <div className='container'>
        <h1>Todos</h1>
        <TodoForm />
        <TodoList />
        {/* <TestButton /> */}
      </div>
    </main>
  )
}

export default App
