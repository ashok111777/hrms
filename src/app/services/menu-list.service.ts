import { Injectable } from '@angular/core';
import { Menu } from '../models/menu-model';

@Injectable({
  providedIn: 'root'
})
export class MenuListService {
  menuItems: Menu;
  constructor() {
    this.initMenuItem();
  }
  initMenuItem() {
    this.menuItems = [
      {
        title: 'About-us',
        icon: 'diversity_2',
        color: '#283593',
        menuId: 'M00030',
        checked: false,
        subMenu: [
          {
            title: 'About us',
            icon: 'navigate_next',
            link: 'app-aboutus',
            color: '303F9F',
            menuId: 'M000300001',
            checked: false,
          },
          {
            title: 'Contact ',
            icon: 'navigate_next',
            link: 'app-contact',
            color: '303F9F',
            menuId: 'M000300002',
            checked: false,
          },
        ]
      },
      {
        title: 'Dashboard',
        icon: 'dashboard',
        link: 'dashboard',
        color: '#283593',
        menuId: 'M00001',
        checked: false,
        subMenu: [
          {
            title: 'Overall',
            icon: 'navigate_next',
            link: 'dashboard',
            color: '#303F9F',
            menuId: 'M000010001',
            checked: false,
          },
          {
            title: 'Attendance Status',
            icon: 'navigate_next',
            link: 'attendence-status',
            color: '#303F9F',
            menuId: 'M000010002',
            checked: false,
          },
        ]
      },
      {
        title: 'Employee',
        icon: 'sensor_occupied',
        color: '#283593',
        menuId: 'M00002',
        checked: false,
        subMenu: [
          {
            title: 'Add New Employee',
            icon: 'navigate_next',
            link: 'employee-registration',
            color: '#303F9F',
            menuId: 'M000020001',
            checked: false,
          },
          {
            title: 'All Employee List',
            icon: 'navigate_next',
            link: 'employee-list',
            color: '#303F9F',
            menuId: 'M000020002',
            checked: false,
          },
          {
            title: 'Training Schedule',
            icon: 'navigate_next',
            color: '#303F9F',
            link: 'training-schedule',
            menuId: 'M000020003',
            checked: false,
          },
          // {
          //   title: 'Mediclaim Request',
          //   icon: 'navigate_next',
          //   color: '#303F9F',
          //   link: 'mediclaim-request',
          //   menuId: 'M000020004',
          //   checked: false,
          // },
          {
            title: 'Probation Management',
            icon: 'navigate_next',
            color: '#303F9F',
            link: 'probation-management',
            menuId: 'M000020005',
            checked: false,
          },
        ],
      },
      {
        title: 'Leave & Permissions',
        icon: 'stream',
        color: '#283593',
        menuId: 'M00009',
        checked: false,
        subMenu: [
          {
            title: 'Leave Requests',
            icon: 'navigate_next',
            link: 'leave-request',
            color: '#303F9F',
            menuId: 'M000090001',
            checked: false,
          },
          {
            title: 'Late Commers',
            icon: 'navigate_next',
            color: '#303F9F',
            link: 'late-come-request',
            menuId: 'M000090002',
            checked: false,
          },
          // {
          //   title: 'Permission',
          //   icon: 'navigate_next',
          //   color: '#303F9F',
          //   link: 'hour-request',
          //   menuId: 'M000090002',
          //   checked: false,
          // },
        ],
      },
      {
        title: 'Management',
        icon: 'manage_accounts',
        color: '#283593',
        menuId: 'M000010',
        checked: false,
        subMenu: [{
          title: 'User Management',
          icon: 'navigate_next',
          color: '#303F9F',
          link: 'user-mgmt',
          menuId: 'M000090002',
          checked: false,
        },/* {
            title: 'Profile Management',
            icon: 'navigate_next',
            link: 'profile-mgmt',
            color: '#303F9F',
            menuId: 'M000090001',
            checked: false,
          },  */ {
          title: 'Institutions Management',
          icon: 'navigate_next',
          link: 'institute-mgmt',
          color: '#303F9F',
          menuId: 'M000090003',
          checked: false,
        }, {
          title: 'Department Management',
          icon: 'navigate_next',
          color: '#303F9F',
          link: 'department-mgmt',
          menuId: 'M000090004',
          checked: false,
        }, {
          title: 'Designation Management',
          icon: 'navigate_next',
          color: '#303F9F',
          link: 'desig-mgmt',
          menuId: 'M000090005',
          checked: false,
        },
        ],
      },
      {
        title: 'Events & Announcements',
        icon: 'campaign',
        color: '#283593',
        menuId: 'M00011',
        checked: false,
        subMenu: [
          {
            title: 'New Joining',
            icon: 'navigate_next',
            link: 'new-joining-wish',
            color: '#303F9F',
            menuId: 'M000110001',
            checked: false,
          },
          {
            title: 'Birthday Wishes',
            icon: 'navigate_next',
            color: '#303F9F',
            link: 'birthday-wishes',
            menuId: 'M000110002',
            checked: false,
          },
          // {
          //   title: 'Kudos Wishes',
          //   icon: 'navigate_next',
          //   color: '#303F9F',
          //   link: 'kudos-wishes',
          //   menuId: 'M000110003',
          //   checked: false,
          // },
          // {
          //   title: 'Holiday',
          //   icon: 'navigate_next',
          //   color: '#303F9F',
          //   link: 'holiday',
          //   menuId: 'M000110004',
          //   checked: false,
          // },
          // {
          //   title: 'News',
          //   icon: 'navigate_next',
          //   color: '#303F9F',
          //   link: 'news',
          //   menuId: 'M000110005',
          //   checked: false,
          // },
          {
            title: 'Leave Calendar',
            icon: 'navigate_next',
            color: '#303F9F',
            link: 'leave-calendar',
            menuId: 'M000110006',
            checked: false,
          },
          // {
          //   title: 'Custom Wishes',
          //   icon: 'navigate_next',
          //   color: '#303F9F',
          //   link: 'custom-wishes',
          //   menuId: 'M000110007',
          //   checked: false,
          // },
          // {
          //   title: 'Fun Friday',
          //   icon: 'navigate_next',
          //   color: '#303F9F',
          //   link: 'fun-friday',
          //   menuId: 'M000110008',
          //   checked: false,
          // },
        ],
      }, {
        title: 'Complaints & Suggestions',
        icon: 'tips_and_updates',
        color: '#303F9F',
        link: 'complaint-suggestions',
        menuId: 'M00012',
        checked: false,
        subMenu: [
          {
            title: 'Complaints',
            icon: 'navigate_next',
            link: 'complaints',
            color: '#303F9F',
            menuId: 'M000120001',
            checked: false,
          },
          {
            title: 'Suggestions',
            icon: 'navigate_next',
            link: 'suggestions',
            color: '#303F9F',
            menuId: 'M000120002',
            checked: false,
          },
        ]
      },
      {
        title: 'Reports',
        icon: 'picture_as_pdf',
        color: '#283593',
        menuId: 'M00020',
        checked: false,
        subMenu: [
          {
            title: 'Employee Report',
            icon: 'navigate_next',
            link: 'employee-report',
            color: '303F9F',
            menuId: 'M000200001',
            checked: false,
          },
          {
            title: 'Attendance Report',
            icon: 'navigate_next',
            link: 'attendance-report',
            color: '#303F9F',
            menuId: 'M000200002',
            checked: false,
          },
          {
            title: 'Latecome Report',
            icon: 'navigate_next',
            link: 'latecome-report',
            color: '#303F9F',
            menuId: 'M000200003',
            checked: false,
          },
          {
            title: 'WorkFromHome Report',
            icon: 'navigate_next',
            link: 'wfh-report',
            color: '#303F9F',
            menuId: 'M000200004',
            checked: false,
          },
          {
            title: 'NewJoining Report',
            icon: 'navigate_next',
            link: 'newjoining-report',
            color: '#303F9F',
            menuId: 'M000200005',
            checked: false,
          },
          {
            title: 'Onsite Employee Report',
            icon: 'navigate_next',
            link: 'onsite-employee-report',
            color: '#303F9F',
            menuId: 'M000200006',
            checked: false,
          },
        ]
      },

    ];
  }
}
