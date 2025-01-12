import { useEffect, useState } from "react"

type Todo = {
  id: number
  value: string
  checked: boolean
}

export default function TodoList() {

  const [todos, setTodos] = useState<Todo[]>([]);


  const fetchTodos = async () => {
    try{
        console.log(import.meta.env.VITE_BACKEND_URL)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`)
        if(response.ok){
            console.log('Server is running')
        }else{
            console.error('Failed to fetch todos')
        }
    }catch(error){
        console.error('can not connect to backend')
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/todos`)
      if (response.ok) {
        const todos = await response.json()
        setTodos(todos)
      } else {
        console.error('Failed to fetch todos')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  function handleCheck(todo: Todo) {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checked: !todo.checked }),
    })

    const newTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, checked: !t.checked }
      }
      return t
    })
    setTodos(newTodos)
  }

  return (
    <section>
      <button onClick={fetchTodos} >Refresh</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => handleCheck(todo)}
          />
          <span>{todo.value}</span>
        </div>
      ))}
    </section>
  )
}
