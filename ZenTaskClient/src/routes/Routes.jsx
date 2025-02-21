import { createBrowserRouter } from 'react-router-dom'
import Home from '../page/home/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
])
