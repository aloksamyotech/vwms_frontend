import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// assets
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

// constant
const icons = {
  IconHome,
  IconHistory,
  IconBrandPaypay,
  IconPackage,
  IconPassword,
  IconReport,
  IconCalendarEvent,
  IconMail,
  IconSettings,
  IconFileUpload,
  IconBrandMastercard,
  IconFileInvoice,
  IconBus,
  IconAntennaBars5,
  IconChecklist,
  IconNotebook,
  IconPhoneCheck,
  IconUsers
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  title: 'Dashboard-Menu',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: '06',
      title: 'Vehicle Types',
      type: 'item',
      url: '/dashboard/call',
      icon: icons.IconBus,
      breadcrumbs: false
    },
    // {
    //   id: '05',
    //   title: 'Service List',
    //   type: 'item',
    //   url: '/dashboard/meeting',
    //   icon: icons.IconUsers,
    //   breadcrumbs: false
    // },

    {
      id: '01',
      title: 'Packages',
      type: 'item',
      url: '/dashboard/lead',
      icon: icons.IconPackage,
      breadcrumbs: false
    },

    {
      id: '11',
      title: 'Booking',
      type: 'collapse',
      children: [
        {
          id: '07',
          title: 'Today Booking',
          type: 'item',
          url: '/dashboard/today/booking',
          // icon: icons.IconMail,
          breadcrumbs: false
        },
        {
          id: '09',
          title: 'All Booking',
          type: 'item',
          url: '/dashboard/document',
          // icon: icons.IconFileUpload,
          breadcrumbs: false
        }
      ],
      icon: icons.IconMail,
      breadcrumbs: false
    },
    {
      id: '02',
      title: 'Payment Transacation',
      type: 'item',
      url: '/dashboard/contact',
      icon: icons.IconBrandPaypay,
      breadcrumbs: false
    },
    {
      id: '03',
      title: 'Out of service',
      type: 'item',
      url: '/dashboard/policy',
      icon: icons.IconNotebook,
      breadcrumbs: false
    },
    {
      id: '04',
      title: 'Income and Expense',
      type: 'item',
      url: '/dashboard/task',
      icon: icons.IconHistory,
      breadcrumbs: false
    },

    {
      id: '12',
      title: 'Reports',
      type: 'collapse',
      icon: icons.IconReport,
      children: [
        {
          id: '08',
          title: 'Bookings',
          type: 'item',
          url: '/dashboard/calender',

          breadcrumbs: false
        },
        {
          id: '10',
          title: 'Income & Expenses',
          type: 'item',
          url: '/dashboard/emailtemplate',
          breadcrumbs: false
        }
      ]
    },
    // {
    //   id: '13',
    //   title: 'Settings',
    //   type: 'collapse',
    //   icon: icons.IconSettings,
    //   children: [
    //     {
    //       id: '14',
    //       title: 'Website Setting',
    //       type: 'item',
    //       url: '/dashboard/settings/websetting',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: '14',
    //       title: 'Payment Setting',
    //       type: 'item',
    //       url: '/dashboard/settings/paymentsetting',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: '14',
    //       title: 'SMTP Configuration',
    //       type: 'item',
    //       url: '/dashboard/settings/smtpconfig',
    //       breadcrumbs: false
    //     },
    //     {
    //       id: '14',
    //       title: 'Twilio Configuration',
    //       type: 'item',
    //       url: '/dashboard/settings/smssetting',
    //       breadcrumbs: false
    //     }
    //   ]
    // },
      // {
      //   id: '15',
      //   title: 'Master Data',
      //   type: 'collapse',
      //   icon: icons.IconBrandMastercard,
      //   children: [
      //     {
      //       id: '14',
      //       title: 'Email Template',
      //       type: 'item',
      //       url: '/dashboard/masterdata/emailtemplate',
      //       breadcrumbs: false
      //     },
      //     {
      //       id: '16',
      //       title: 'SMS Template',
      //       type: 'item',
      //       url: '/dashboard/masterdata/smstemplate',
      //       breadcrumbs: false
      //     },
      //     {
      //       id: '17',
      //       title: 'Service Status',
      //       type: 'item',
      //       url: '/dashboard/masterdata/servicestatus',
      //       breadcrumbs: false
      //     }
      //   ]
      // },
    {
      id: '18',
      title: 'User',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: '19',
          title: 'User ManageMent',
          type: 'item',
          url: '/dashboard/user/usermanagement',
          breadcrumbs: false
        },
        {
          id: '19',
          title: 'Add User',
          type: 'item',
          url: '/dashboard/user/adduser',
          breadcrumbs: false
        }
      ]
    },
    {
      id: '19',
      title: 'Employee',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: '19',
          title: 'Employee ManageMent',
          type: 'item',
          url: '/dashboard/employee/employeemanagement',
          breadcrumbs: false
        },
        {
          id: '19',
          title: 'Add Employee',
          type: 'item',
          url: '/dashboard/employee',
          breadcrumbs: false
        }
      ]
    },
    {
      id: '20',
      title: 'Reset Password',
      type: 'item',
      url: '/dashboard/resetpassword',
      icon: icons.IconPassword,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
