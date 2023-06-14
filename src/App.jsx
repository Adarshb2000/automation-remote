import './App.css'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <Link to={'/add-room'}>Add new room</Link>
      <p className="font-bold">Hello World!</p>
    </div>
  )
}

export default App
