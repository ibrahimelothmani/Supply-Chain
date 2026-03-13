import { useState } from 'react'
import './App.css'
import type { User } from './models/User'


const BASE_URL = "http://localhost:8080/api/users"


function App() {

  const [users, setUsers] = useState<User[]>([])

  const getUsers = async () => {
    try {
      const response = await fetch(BASE_URL)
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  return (
    <>
    <h1>GET ALL USERS</h1>
    <button onClick={getUsers}>Get Users</button>
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
    </>
  )
}

export default App
