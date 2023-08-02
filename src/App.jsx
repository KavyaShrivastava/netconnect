import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/Login'
import SignUpPage from './pages/Signup';
import DashboardPage from './pages/Dashboard';
import PrivateRoute from './utils/PrivateRoute';

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
    element: <PrivateRoute element={<DashboardPage />} />,
  }
]);

function App() {
  return (
    <RouterProvider router = {router} />
  )
}

export default App
