import { PermissionCode } from 'src/libs/core/enum/role-code.enum';
import {
  URL_CONTACT,
  URL_CUSTOMER,
  URL_INVOICE,
  URL_TOUR,
} from '@pages/manager';

export interface ISidebarMenu {
  name: string;
  url: string;
  icon?: string;
  isSwitchSidebar?: boolean;
  permissonCode: number[];
}

// Set name as translate value
export const MENU_GROUP: ISidebarMenu[] = [
  {
    name: 'tour',
    url: URL_TOUR,
    icon: 'plane-departure',
    permissonCode: [PermissionCode.ADMIN, PermissionCode.BUSINESS],
  },
  {
    name: 'invoice',
    url: URL_INVOICE,
    icon: 'receipt-alt',
    permissonCode: [PermissionCode.ADMIN, PermissionCode.BUSINESS],
  },
  {
    name: 'customer',
    url: URL_CUSTOMER,
    icon: 'user',
    permissonCode: [PermissionCode.ADMIN, PermissionCode.BUSINESS],
  },
  {
    name: 'contact',
    url: URL_CONTACT,
    icon: 'phone',
    permissonCode: [PermissionCode.ADMIN],
  },

  // [
  //   {
  //     name: 'workspaceSettings',
  //     icon: 'key',
  //     url: '',
  //     permissionCodes: [
  //       PERMISSION_CODE.INSIGHT_SETTINGS.VIEW,
  //       PERMISSION_CODE.JOB_TITLES.VIEW,
  //       PERMISSION_CODE.OFFICES.VIEW,
  //       PERMISSION_CODE.ROLES_AND_PERMISSIONS.VIEW,
  //     ],
  //     isSwitchSidebar: true,
  //   },
  // ],
];

// export const WORKSPACE_SETTING_MENU_GROUP: ISidebarMenu[][] = [
//   [
//     {
//       name: 'insightsSettings',
//       url: URL_WORKSPACE_SETTINGS,
//       permissionCodes: [PERMISSION_CODE.INSIGHT_SETTINGS.VIEW],
//     },
//     {
//       name: 'rolesAndPermissions',
//       url: URL_ROLES_PERMISSION,
//       permissionCodes: [PERMISSION_CODE.ROLES_AND_PERMISSIONS.VIEW],
//     },
//     // {
//     //   name: 'subscriptionAndHistory',
//     //   url: '',
//     // },
//     // {
//     //   name: 'authentication',
//     //   url: '',
//     // },
//   ],
//   [
//     {
//       name: 'hrSettings',
//       url: '',
//       permissionCodes: [
//         PERMISSION_CODE.JOB_TITLES.VIEW,
//         PERMISSION_CODE.OFFICES.VIEW,
//       ],
//       subMenu: [
//         {
//           name: 'offices',
//           url: URL_OFFICES,
//           permissionCodes: [PERMISSION_CODE.OFFICES.VIEW],
//         },
//         {
//           name: 'departments',
//           url: URL_DEPARTMENTS,
//           permissionCodes: [PERMISSION_CODE.DEPARTMENT.VIEW],
//         },
//         {
//           name: 'jobTitles',
//           url: URL_JOB,
//           permissionCodes: [PERMISSION_CODE.JOB_TITLES.VIEW],
//         },
//         {
//           name: 'workingSchedules',
//           url: URL_WORKING_SCHEDULES,
//           permissionCodes: [PERMISSION_CODE.WORKING_SCHEDULE.VIEW],
//         },
//         // {
//         //   name: 'customFields',
//         //   url: '',
//         // },
//         {
//           name: 'timeOff',
//           url: URL_TIME_OFF,
//           permissionCodes: [
//             PERMISSION_CODE.TIME_OFF_TYPE.VIEW,
//             PERMISSION_CODE.POLICY.VIEW,
//             PERMISSION_CODE.HOLIDAY_CALENDAR.VIEW,
//           ],
//         },
//         {
//           name: 'checklists',
//           url: URL_CHECKLISTS,
//         },
//       ],
//     },
//     // {
//     //   name: 'teamSettings',
//     //   url: '',
//     // },
//   ],
//   // [
//   //   {
//   //     name: 'userProvisioning',
//   //     url: '',
//   //   },
//   //   {
//   //     name: 'adIntegration',
//   //     url: '',
//   //   },
//   // ],
//   [
//     {
//       name: 'launchIworkspace',
//       url: '',
//       followIcon: 'fullscreen',
//       isSwitchSidebar: false,
//     },
//   ],
// ];
