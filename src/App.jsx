import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/Login'
import SignUpPage from './pages/Signup';
import DashboardPage from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage/>,
  },
  {
    path: '/signup',
    element: <SignUpPage/>,
  },
  {
    path: '/dashboard',
    element: <DashboardPage/>
  }
]);

function App() {
  return (
    <RouterProvider router = {router} />
  )
}

export default App
