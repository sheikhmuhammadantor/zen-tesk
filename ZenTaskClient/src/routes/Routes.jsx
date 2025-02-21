import { createBrowserRouter } from 'react-router-dom'
// import Home from '../page/home/Home'
// import App from '../App'
import DragAndDrop from '../components/DragAndDrop'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DragAndDrop />
  }
])
