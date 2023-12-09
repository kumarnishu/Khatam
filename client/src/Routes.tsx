import React, { Suspense, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './contexts/userContext'
import LoginPage from './pages/users/LoginPage'
import UsersNavBar from './components/navbar/UsersNavBar'
import EmailVerifyPage from './pages/users/EmailVerifyPage'
import DashBoardNavBar from './components/navbar/DashboardNavbar'
import DashBoardPage from './pages/DashBoardPage'
import { LinearProgress } from '@mui/material'

const ResetPasswordDialog = React.lazy(() => import('./components/dialogs/users/ResetPasswordDialog'))
const UsersPage = React.lazy(() => import('./pages/users/UsersPage'))
const UsersHelpPage = React.lazy(() => import('./pages/users/UsersHelpPage'))


export enum paths {
  users = "users",
  login = "/",
  dashboard = "/",
  users_help = "help/users",
  reset_password = "/password/reset/email/:token",
  verify_email = "/email/verify/:token",
}

function AppRoutes() {
  const { user } = useContext(UserContext)

  return (
    <Routes >
      {
        !user && <Route path={paths.login} element={<LoginPage />} />}
      {
        user && <Route>
          < Route element={<DashBoardNavBar />
          }>
            <Route
              path={paths.dashboard}
              element={
                <DashBoardPage />
              }
            />
          </Route>
          {/* users nav bar */}
          {!user.user_access_fields.is_hidden &&
            < Route path={paths.users} element={<UsersNavBar />}>
              <Route index
                element={
                  <Suspense fallback={<LinearProgress />}>
                    <UsersPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.users} element={
                  <Suspense fallback={<LinearProgress />}>
                    <UsersPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.users_help} element={
                  <Suspense fallback={<LinearProgress />}>
                    <UsersHelpPage />
                  </Suspense>
                }
              />
            </Route>}
        </Route>
      }

      <Route path={paths.reset_password} element={<Suspense fallback={<LinearProgress />}><ResetPasswordDialog /></Suspense>} />
      <Route path={paths.verify_email} element={<EmailVerifyPage />} />
      <Route path="*" element={<Navigate to={paths.login} />} />
    </Routes >

  )
}

export default AppRoutes




