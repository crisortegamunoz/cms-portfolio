import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'MENUITEMS.DASHBOARD.TEXT',
    iconType: 'feather',
    icon: 'home',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: 'dashboard',
        title: 'MENUITEMS.DASHBOARD.LIST.DASHBOARD',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: 'category',
    title: 'MENUITEMS.CATEGORY.TEXT',
    iconType: 'feather',
    icon: 'eye',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: 'technology',
    title: 'MENUITEMS.TECHNOLOGY.TEXT',
    iconType: 'feather',
    icon: 'code',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: 'skill',
    title: 'MENUITEMS.SKILL.TEXT',
    iconType: 'feather',
    icon: 'file-plus',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: 'about',
    title: 'MENUITEMS.ABOUT.TEXT',
    iconType: 'feather',
    icon: 'user-plus',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: 'certificate',
    title: 'MENUITEMS.CERTIFICATE.TEXT',
    iconType: 'feather',
    icon: 'hard-drive',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: 'portfolio',
    title: 'MENUITEMS.PORTFOLIO.TEXT',
    iconType: 'feather',
    icon: 'briefcase',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: 'experience',
    title: 'MENUITEMS.EXPERIENCE.TEXT',
    iconType: 'feather',
    icon: 'edit',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  // Common Modules
  {
    path: '',
    title: 'MENUITEMS.APPS.TEXT',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'MENUITEMS.MORE-APPS.TEXT',
    iconType: 'feather',
    icon: 'star',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '4',
    badgeClass: 'badge bg-orange sidebar-badge float-end',
    submenu: [
      {
        path: '/apps/chat',
        title: 'MENUITEMS.MORE-APPS.LIST.CHAT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/apps/dragdrop',
        title: 'MENUITEMS.MORE-APPS.LIST.DRAG-DROP',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/apps/contact-grid',
        title: 'MENUITEMS.MORE-APPS.LIST.CONTACT-GRID',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/apps/support',
        title: 'MENUITEMS.MORE-APPS.LIST.SUPPORT',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'MENUITEMS.COMPONENTS.TEXT',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'User Interface (UI)',
    iconType: 'feather',
    icon: 'copy',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/ui/alerts',
        title: 'Alerts',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/badges',
        title: 'Badges',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/chips',
        title: 'Chips',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/modal',
        title: 'Modal',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/buttons',
        title: 'Buttons',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/expansion-panel',
        title: 'Expansion Panel',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/bottom-sheet',
        title: 'Bottom Sheet',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/dialogs',
        title: 'Dialogs',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/cards',
        title: 'Cards',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/labels',
        title: 'Labels',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/list-group',
        title: 'List Group',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/snackbar',
        title: 'Snackbar',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/preloaders',
        title: 'Preloaders',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/progressbars',
        title: 'Progress Bars',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/tabs',
        title: 'Tabs',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/typography',
        title: 'Typography',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/ui/helper-classes',
        title: 'Helper Classes',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Timeline',
    iconType: 'feather',
    icon: 'git-merge',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/timeline/timeline1',
        title: 'Timeline 1',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/timeline/timeline2',
        title: 'Timeline 2',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Icons',
    iconType: 'feather',
    icon: 'feather',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/icons/material',
        title: 'Material Icons',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/icons/font-awesome',
        title: 'Font Awesome',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Authentication',
    iconType: 'feather',
    icon: 'user-check',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/authentication/signin',
        title: 'Sign In',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/authentication/signup',
        title: 'Sign Up',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/authentication/forgot-password',
        title: 'Forgot Password',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/authentication/locked',
        title: 'Locked',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/authentication/page404',
        title: '404 - Not Found',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/authentication/page500',
        title: '500 - Server Error',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Extra Pages',
    iconType: 'feather',
    icon: 'anchor',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/extra-pages/profile',
        title: 'Profile',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/extra-pages/pricing',
        title: 'Pricing',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/extra-pages/invoice',
        title: 'Invoice',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/extra-pages/faqs',
        title: 'Faqs',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/extra-pages/blank',
        title: 'Blank Page',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Maps',
    iconType: 'feather',
    icon: 'map-pin',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/maps/google',
        title: 'Google Map',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'Multi level Menu',
    iconType: 'feather',
    icon: 'chevrons-down',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/multilevel/first1',
        title: 'First',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/',
        title: 'Second',
        iconType: '',
        icon: '',
        class: 'ml-sub-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [
          {
            path: '/multilevel/secondlevel/second1',
            title: 'Second 1',
            iconType: '',
            icon: '',
            class: 'ml-menu2',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
          {
            path: '/',
            title: 'Second 2',
            iconType: '',
            icon: '',
            class: 'ml-sub-menu2',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [
              {
                path: '/multilevel/thirdlevel/third1',
                title: 'third 1',
                iconType: '',
                icon: '',
                class: 'ml-menu3',
                groupTitle: false,
                badge: '',
                badgeClass: '',
                submenu: [],
              },
            ],
          },
        ],
      },
      {
        path: '/multilevel/first3',
        title: 'Third',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
];
