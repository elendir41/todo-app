import './App.css'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

function App() {

  return (
    <main>
      <div className='container'>
        <h1>Todos</h1>
        <TodoForm />
        <TodoList />
      </div>
    </main>
  )
}

export default App
