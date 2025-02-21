import { createBrowserRouter } from 'react-router-dom'
// import Home from '../page/home/Home'
import App from '../App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])
