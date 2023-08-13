import {useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import './index.css'

const Navbar = styled.nav`
  background-image: linear-gradient(to right, #ffffff, #000000);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
`

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  width: 120px;
  height: 50px;
  border-radius: 4px;
  cursor: pointer;
`

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 2rem;
`

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
`

function App() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://reqres.in/api/users?page=1')
      setUsers(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar>
        <img
          src="https://res.cloudinary.com/dorqso4uz/image/upload/v1691920284/v_name_logo_jcc9vy.jpg"
          alt="Brand Name"
          className="logo"
        />
        <Button onClick={getUsers}>Get Users</Button>
      </Navbar>
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <CardGrid>
            {users.map(user => (
              <Card key={user.id}>
                <img
                  className="image"
                  src={user.avatar}
                  alt={user.first_name}
                />
                <div>
                  <h1>
                    {user.first_name} {user.last_name}
                  </h1>
                  <p>Email: {user.email}</p>
                </div>
              </Card>
            ))}
          </CardGrid>
        )}
      </div>
    </div>
  )
}

export default App
