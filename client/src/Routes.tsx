import React, { Suspense, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './contexts/userContext'
import LoginPage from './pages/users/LoginPage'
import UsersNavBar from './components/navbar/UsersNavBar'
import EmailVerifyPage from './pages/users/EmailVerifyPage'
import DashBoardNavBar from './components/navbar/DashboardNavbar'
import DashBoardPage from './pages/DashBoardPage'
import { LinearProgress } from '@mui/material'
import CrmNavBar from './components/navbar/CrmNavBar'
import BotNavBar from './components/navbar/BotNavBar'
import FlowsPage from './pages/bot/FlowsPage'
import BotHelpPage from './pages/bot/BotHelpPage'


const ResetPasswordDialog = React.lazy(() => import('./components/dialogs/users/ResetPasswordDialog'))
const CompaniesPage = React.lazy(() => import('./pages/company/CompaniesPage'))
const CompaniesHelpPage = React.lazy(() => import('./pages/company/CompaniesHelpPage'))
const LeadsPage = React.lazy(() => import('./pages/crm/LeadsPage'))
const CrmHelpPage = React.lazy(() => import('./pages/crm/CrmHelpPage'))
const BackupPage = React.lazy(() => import('./pages/backup/BackupPage'))
const BackupHelpPage = React.lazy(() => import('./pages/backup/BackupHelpPage'))
const ReportPage = React.lazy(() => import('./pages/reports/ReportPage'))
const ReportHelpPage = React.lazy(() => import('./pages/reports/ReportHelpPage'))
const UsersPage = React.lazy(() => import('./pages/users/UsersPage'))
const UsersHelpPage = React.lazy(() => import('./pages/users/UsersHelpPage'))
const RefersPage = React.lazy(() => import('./pages/crm/RefersPage'))
const CrmActivitiesPage = React.lazy(() => import('./pages/crm/CrmActivitiesPage'))
const CustomersPage = React.lazy(() => import('./pages/crm/CustomersPage'))
const UselessLeadsPage = React.lazy(() => import('./pages/crm/UselessLeadsPage'))
const CrmReminderPage = React.lazy(() => import('./pages/crm/CrmReminderPage'))
const UpdateLeadFieldsPage = React.lazy(() => import('./pages/crm/UpdateLeadFieldsPage'))



export enum paths {
  // crm
  crm = "/crm",
  crm_reminders = "crm_reminders",
  crm_activities = "crm_activities",
  customers = "customers",
  updateble_fields_lead = "updateble_fields_lead",
  refers = "refers",
  useless_leads = "useless_leads",
  leads = "leads",
  crm_help_page = "crm_help_page",

  // company
  company = "company",
  company_help_page = "company_help_page",

  // reports
  report = "reports",
  report_help_page = "report_help_page",

  // backup
  backup = "backups",
  backup_help_page = "backup_help_page",

  //bot
  bot = "bot",
  flows = "flows",
  bot_help_page = "bot_help_page",

  // users
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
          {/* crm nav bar */}
          {!user.crm_access_fields.is_hidden &&
            < Route path={paths.crm} element={<CrmNavBar />}>
              <Route index
                element={
                  <Suspense fallback={<LinearProgress />}>
                    <LeadsPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.leads} element={
                  <Suspense fallback={<LinearProgress />}>
                    <LeadsPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.updateble_fields_lead} element={
                  <Suspense fallback={<LinearProgress />}>
                    < UpdateLeadFieldsPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.crm_reminders} element={
                  <Suspense fallback={<LinearProgress />}>
                    <CrmReminderPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.useless_leads} element={
                  <Suspense fallback={<LinearProgress />}>
                    <UselessLeadsPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.customers} element={
                  <Suspense fallback={<LinearProgress />}>
                    <CustomersPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.crm_activities} element={
                  <Suspense fallback={<LinearProgress />}>
                    <CrmActivitiesPage />
                  </Suspense>
                }
              />

              <Route
                path={paths.refers} element={
                  <Suspense fallback={<LinearProgress />}>
                    <RefersPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.crm_help_page} element={
                  <Suspense fallback={<LinearProgress />}>
                    <CrmHelpPage />
                  </Suspense>
                }
              />
            </Route>}

          {/* companies page */}
          {!user.company_access_fields.is_hidden &&
            < Route path={paths.company} element={<UsersNavBar />}>
              <Route index
                element={
                  <Suspense fallback={<LinearProgress />}>
                    <CompaniesPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.company} element={
                  <Suspense fallback={<LinearProgress />}>
                    <CompaniesPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.company_help_page} element={
                  <Suspense fallback={<LinearProgress />}>
                    <CompaniesHelpPage />
                  </Suspense>
                }
              />
            </Route>}
          {/* reports page */}
          {!user.report_access_fields.is_hidden &&
            < Route path={paths.report} element={<UsersNavBar />}>
              <Route index
                element={
                  <Suspense fallback={<LinearProgress />}>
                    <ReportPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.report} element={
                  <Suspense fallback={<LinearProgress />}>
                    <ReportPage />
                  </Suspense>
                }
              />

              <Route
                path={paths.report_help_page} element={
                  <Suspense fallback={<LinearProgress />}>
                    <ReportHelpPage />
                  </Suspense>
                }
              />
            </Route>}
          {user.is_admin &&
            < Route path={paths.bot} element={<BotNavBar />}>
              <Route index
                element={
                  <FlowsPage />
                }
              />
              <Route
                path={paths.flows} element={
                  <FlowsPage />
                }
              />
              <Route
                path={paths.bot_help_page} element={
                  <BotHelpPage />
                }
              />

            </Route>}
          {/* cr
          {/* backup page */}
          {!user.backup_access_fields.is_hidden &&
            < Route path={paths.backup} element={<UsersNavBar />}>
              <Route index
                element={
                  <Suspense fallback={<LinearProgress />}>
                    <BackupPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.backup} element={
                  <Suspense fallback={<LinearProgress />}>
                    <BackupPage />
                  </Suspense>
                }
              />
              <Route
                path={paths.backup_help_page} element={
                  <Suspense fallback={<LinearProgress />}>
                    <BackupHelpPage />
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




