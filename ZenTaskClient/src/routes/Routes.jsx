import { createBrowserRouter } from 'react-router-dom'
// import Home from '../page/home/Home'
// import App from '../App'
import DragAndDrop from '../components/DragAndDrop'
import Login from '../page/auth/Login'
import ErrorPage from '../page/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DragAndDrop />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />
  }
])
