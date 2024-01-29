import './App.css'
import api from './api/api'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Home from './pages/User/Home'
import Register from './pages/Login/Register'
import Login from './pages/Login/Login' 
import PageNotFound from './pages/Pagenotfound'
import LayoutUser from './components/LayoutUser'
import Events from './pages/User/Events'
import About from './pages/User/About'
import ContactUs from './pages/User/ContactUs'

import LayoutAdmin from './components/LayoutAdmin'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import DashboardEvents from './pages/Admin/Events/Events'
import DashboardUser from './pages/Admin/Users/User'
import Admin from './pages/Admin/Admin/Admin'
import AdminProfile from './pages/Admin/Admin/AdminProfile'
import AddEvent from './pages/Admin/Events/AddEvent'

import ProtectedRoute from './route/ProtectedRoute'
import VerifyOTP from './pages/Verification/VerifyOTP'
import ChangePassword from './pages/Verification/ChangePassword'
import ChangePasswordOTP from './pages/Verification/ChangePasswordOTP'
import ConfirmPassword from './pages/Verification/ConfirmPassword'

import Profile from './pages/User/Profile'
import Attendees from './pages/Admin/Attendees/Attendees'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const userId = Cookies.get('userId')
  const token = Cookies.get('token')
  const role = Cookies.get('role')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await api.get(`/user/id/${userId}`);
            if(response.data.role === role && token) {
              setIsLoggedIn(true)
              setUserRole(response.data.role)
            } else {
              setIsLoggedIn(false)
              setUserRole(null)
              navigate('/*')
            } 
        } 
      } catch (error) {
        console.log(error)
      }

    }
    fetchData()
  }, [userId, token, role, navigate])

  const adminLinks = [
    { title: 'Dashboard', path: '/dashboard', component: <Dashboard />},
    { title: 'Events', path: '/admin-events', component: <DashboardEvents />},
    { title: 'Add Event', path: '/add-event', component: <AddEvent />},
    { title: 'Attendees', path: '/admin-attendees', component: <Attendees />},
    { title: 'Users', path: '/admin-users', component: <DashboardUser />},
    { title: 'Admin', path: '/admin', component: <Admin />},
    { title: 'Profile', path: '/admin-profile', component: <AdminProfile />},
  ];

  return (
    <>
     <Routes>
      <Route path="/" element={
        <LayoutUser>
          <Home />
        </LayoutUser>
      } />

      <Route path='/change-password' element={
        <LayoutUser>
          <ChangePassword />
        </LayoutUser>
      }/>

      <Route path='/change-password-otp' element={
        <LayoutUser>
          <ChangePasswordOTP />
        </LayoutUser> 
      } />

      <Route path='/confirm-password' element={
        <LayoutUser>
          <ConfirmPassword />
        </LayoutUser>
      } />

      <Route path='/register' element={
        <LayoutUser>
          <Register />
        </LayoutUser>
      }/>

      <Route path='/login' element={
        <LayoutUser>
          <Login />
        </LayoutUser>
      }/>

      <Route path='/verify-otp' element={
        <LayoutUser>
          <VerifyOTP />
        </LayoutUser>
      }/>


      <Route path='/home' element={
        // <ProtectedRoute element={
          <LayoutUser>
            <Home />
          </LayoutUser>
        // } 
        // allowedRoles={['user']}
        // isLoggedIn={isLoggedIn}
        // userRole={userRole}/>
      }/>
      <Route path='/events' element={
        <LayoutUser>
          <Events />
        </LayoutUser>
      }/>
      <Route path='/about' element={
        <LayoutUser>
          <About />
        </LayoutUser>
      }/>
      <Route path='/contact-us' element={
        <LayoutUser>
          <ContactUs />
        </LayoutUser>
      }/>
      <Route path='/profile' element={
        <LayoutUser>
          <Profile />
        </LayoutUser>
      }/>

      { adminLinks.map((link, index) => (
        <Route key={index} path={link.path} element={
          <ProtectedRoute element={
            <LayoutAdmin>
              {link.component}
            </LayoutAdmin>
          } 
          allowedRoles={['admin']}
          isLoggedIn={isLoggedIn}
          userRole={userRole}/>
        }/>
      ))}

      <Route path='/*' element={<PageNotFound />}/>
     </Routes>
    </>
  )
}

export default App
