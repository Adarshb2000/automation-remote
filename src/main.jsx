import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import AddRoom from './AddRoom.jsx'
import NewRoom from './NewRoom.jsx'
import ConstructRoom from './ConstructRoom.jsx'

import './index.css'
import Test from './Test.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/add-room',
    element: <AddRoom />,
  },
  { path: '/test-room', element: <NewRoom /> },
  { path: '/test', element: <Test /> },
  { path: '/construct', element: <ConstructRoom /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
