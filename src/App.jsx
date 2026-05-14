import React ,  { useContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CarList from './pages/CarList'
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminWrapper from './wrapper/AdminWrapper'
import ProtectedWrapper from './wrapper/ProtectedWrapper'
import AdminCars from './pages/AdminCars'
import UserDashboard from './pages/UserDashboard'
import Reviews from './components/Review'
import Footer from './components/Footer'
import UserLayout from './layouts/UserLayout'
import MyBookings from './pages/MyBooking'
import Cars from './pages/admin/cars'
import Bookings from './pages/admin/bookings'
import Drivers from './pages/admin/drivers'
import Users from './pages/admin/users'
import BookingPage from './pages/BookingPage'
import Offers from './pages/Offers'

const router = createBrowserRouter([
  //  PUBLIC ROUTES
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },

  //  USER DASHBOARD LAYOUT
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedWrapper>
            <UserDashboard />
          </ProtectedWrapper>
        )
      },
      {
        path: "cars",
        element: (
          <ProtectedWrapper>
            <CarList />
          </ProtectedWrapper>
        )
      },
      {
        path: "offers",
        element: (
          <ProtectedWrapper>
            <Offers />
          </ProtectedWrapper>
        )
      },

      //  FIXED ROUTES
      {
        path: "bookings/:carId",
        element: (
          <ProtectedWrapper>
            <BookingPage />
          </ProtectedWrapper>
        )
      },
      {
        path: "bookings",
        element: (
          <ProtectedWrapper>
            <MyBookings />
          </ProtectedWrapper>
        )
      },
    ]
  },

   {
    path: "/admin",
    element: (
      <ProtectedWrapper>
        <AdminWrapper />
      </ProtectedWrapper>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "cars",
        element: <Cars />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "drivers",
        element: <Drivers />,
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
    <RouterProvider router= {router} />
  <ToastContainer 
  position= "top-right"
  autoClose={3000}
  hideProgressBar= {false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  />
  </AuthProvider>
  )
}

export default App