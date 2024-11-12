import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Index from 'views/Settings/WebSetting';
import PrivateRoutes from './PrivateRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const LeadManagement = Loadable(lazy(() => import('views/Packages')));
const ContactManagement = Loadable(lazy(() => import('views/PaymentTransection')));
const Call = Loadable(lazy(() => import('views/VehicleTypes')));
const Policy = Loadable(lazy(() => import('views/OutOfService')));
const Meeting = Loadable(lazy(() => import('views/ServiceList')));
const Email = Loadable(lazy(() => import('views/Booking/TodayBooking')));
const Task = Loadable(lazy(() => import('views/IncomeAndExpense')));
const EmailTemplates = Loadable(lazy(() => import('views/Reports/IncomeAndExpenseReport')));
const Document = Loadable(lazy(() => import('views/Booking/AllBooking')));
const Calender = Loadable(lazy(() => import('views/Reports/BookingReport')));
const EmailTemplate = Loadable(lazy(() => import('views/MasterData/EmailTemplate')));
const SmsTemplate = Loadable(lazy(() => import('views/MasterData/SMSTemplate')));
const ServiceStatus = Loadable(lazy(() => import('views/MasterData/ServiceStatus')));
const UserManagement = Loadable(lazy(() => import('views/Users/UserManagement')));
const AddUser = Loadable(lazy(() => import('views/Users/AddUser')));
const ResetPassword = Loadable(lazy(() => import('views/ResetPassword')));
const SmtpConfig = Loadable(lazy(() => import('views/Settings/SMTPConfig')));
const SMSSetting = Loadable(lazy(() => import('views/Settings/SMSSetting')));
const PaymentSetting = Loadable(lazy(() => import('views/Settings/PaymentSetting')));
const Employee = Loadable(lazy(()=>import('views/employe')))
const EmployeeManagement = Loadable(lazy(()=>import('views/employe/EmployeeMangae')))
const ViewBooking  = Loadable(lazy(()=>import(`views/Booking/view`)))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <PrivateRoutes />,
      children: [
        {
          path: '/',
          element: <DashboardDefault />
        },
        {
          path: 'dashboard',
          children: [
            {
              path: 'default',
              element: <DashboardDefault />
            },
            {
              path: 'lead',
              element: <LeadManagement />
            },
            {
              path: 'contact',
              element: <ContactManagement />
            },
            {
              path: 'call',
              element: <Call />
            },
            {
              path: 'policy',
              element: <Policy />
            },
            {
              path: 'task',
              element: <Task />
            },
            {
              path: 'today/booking',
              element: <Email />
            },
            {
              path: 'meeting',
              element: <Meeting />
            },
            {
              path: 'calender',
              element: <Calender />
            },
            {
              path: 'document',
              element: <Document />
            },
            {
              path: 'emailtemplate',
              element: <EmailTemplates />
            },
            {
              path : 'employee',
              element : <Employee/>
            },
            {
              path: 'settings/websetting',
              element: <Index />
            },
            {
              path: 'masterdata/emailtemplate',
              element: <EmailTemplate />
            },
            {
              path: 'masterdata/smstemplate',
              element: <SmsTemplate />
            },
            {
              path: 'masterdata/servicestatus',
              element: <ServiceStatus />
            },
            {
              path: 'user/usermanagement',
              element: <UserManagement />
            },
           {
            path : 'employee/employeemanagement',
            element : <EmployeeManagement/>
           },

            {
              path: 'user/adduser',
              element: <AddUser />
            },
            {
              path: 'resetpassword',
              element: <ResetPassword />
            },
            {
              path: 'settings/smtpconfig',
              element: <SmtpConfig />
            },
            {
              path: 'settings/smssetting',
              element: <SMSSetting />
            },
            {
              path: 'settings/paymentsetting',
              element: <PaymentSetting />
            },
            {
              path : 'booking/view/:id',
              element : <ViewBooking/>
            }
          ]
        }
      ]
    }
  ]
};

export default MainRoutes;
