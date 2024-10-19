import React, { useState } from 'react'

export default function TodoForm() {
  const [todo, setTodo] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!todo) return
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: todo }),
      })
      if (response.ok) {
        console.log('Todo added successfully')
        setTodo('')
      } else {
        console.error('Failed to add todo')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <form action='' className='todo-form' onSubmit={handleSubmit}>
        <label>New todo</label>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
