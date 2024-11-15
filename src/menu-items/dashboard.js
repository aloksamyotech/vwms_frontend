import { jwtDecode } from 'jwt-decode';
import {
  IconHome,
  IconPackage,
  IconReport,
  IconCalendarEvent,
  IconMail,
  IconBrandMastercard,
  IconSettings,
  IconFileUpload,
  IconUsers,
  IconPassword,
  IconFileInvoice,
  IconAntennaBars5,
  IconChecklist,
  IconHistory,
  IconBrandPaypay,
  IconNotebook,
  IconPhoneCheck,
  IconBus
} from '@tabler/icons';

const dashboard = {
  title: 'Dashboard-Menu',
  type: 'group',
  children: [
    {
      id: 'default',
      permission: 'Dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: IconHome,
      breadcrumbs: false
    },
    {
      id: '06',
      permission: 'vehicleType',
      title: 'Vehicle Type',
      type: 'item',
      url: '/dashboard/call',
      icon: IconBus,
      breadcrumbs: false
    },
    {
      id: '01',
      permission: 'packages',
      title: 'Packages',
      type: 'item',
      url: '/dashboard/lead',
      icon: IconPackage,
      breadcrumbs: false
    },
    {
      id: '11',
      permission: 'bookings',
      title: 'Bookings',
      type: 'collapse',
      children: [
        {
          id: '07',
          permission: 'bookings',
          title: 'Today Bookings',
          type: 'item',
          url: '/dashboard/today/booking',
          breadcrumbs: false
        },
        {
          id: '09',
          permission: 'bookings',
          title: 'All Booking',
          type: 'item',
          url: '/dashboard/document',
          breadcrumbs: false
        }
      ],
      icon: IconMail,
      breadcrumbs: false
    },
    {
      id: '02',
      permission: 'paymentTransaction',
      title: 'Payment Transaction',
      type: 'item',
      url: '/dashboard/contact',
      icon: IconBrandPaypay,
      breadcrumbs: false
    },
    {
      id: '03',
      permission: 'outOfService',
      title: 'Holiday',
      type: 'item',
      url: '/dashboard/policy',
      icon: IconNotebook,
      breadcrumbs: false
    },
    {
      id: '19',
      permission: 'incomeExpense',
      title: 'Income And Expense',
      type: 'item',
      url: '/dashboard/task',
      icon: IconHistory,
      breadcrumbs: false
    },
    {
      id: '12',
      permission: 'reports',
      title: 'Reports',
      type: 'collapse',
      icon: IconReport,
      children: [
        {
          id: '08',
          permission: 'bookings',
          title: 'Booking Reports',
          type: 'item',
          url: '/dashboard/calender',
          breadcrumbs: false
        },
        {
          id: '10',
          permission: 'incomeExpense',
          title: 'Income And Expense Report',
          type: 'item',
          url: '/dashboard/emailtemplate',
          breadcrumbs: false
        }
      ]
    },
    {
      id: '29',
      permission: 'users',
      title: 'Users',
      type: 'item',
      url: '/dashboard/user/usermanagement',
      icon: IconUsers,
      breadcrumbs: false
    },
    {
      id: '23',
      permission: 'Employee',
      title: 'Employee',
      type: 'item',
      url: '/dashboard/employee/employeemanagement',
      icon: IconUsers,
      breadcrumbs: false
    },
    {
      id: '25',
      permission: 'Reset Password',
      title: 'Reset Password',
      type: 'item',
      url: '/dashboard/resetpassword',
      icon: IconPassword,
      breadcrumbs: false
    }
  ]
};

const token = localStorage.getItem('token');
if (!token) {
  console.error('No token found');
}

const decodeJwt = jwtDecode(token);

const userPermissions = decodeJwt.permissions;

const filterDashboardByPermissions = (permissions, dashboard) => {
  const filteredDashboard = {
    title: dashboard.permission,
    type: dashboard.type,
    children: dashboard.children
      .filter((child) => {
        return permissions.includes(child.permission);
      })
      .map((child) => {
        if (child.children && child.children.length > 0) {
          child.children = child.children.filter((subChild) => permissions.includes(subChild.permission));
        }
        return child;
      })
  };
  return filteredDashboard;
};

const filteredDashboard = filterDashboardByPermissions(userPermissions, dashboard);

export default filteredDashboard;
