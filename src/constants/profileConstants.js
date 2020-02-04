import orderBlackIcon from 'Icons/orders-icon-black.svg';
import helpCenterBlackIcon from 'Icons/help-center-icon-black.svg';
import wishlistBlackIcon from 'Icons/wishlist-icon-black.svg';
import addressBlackIcon from 'Icons/address-icon-black.svg';
import profileBlackIcon from 'Icons/profile-icon-black.svg';
import settingsBlackIcon from 'Icons/settings-icon-black.svg';
import logoutBlackIcon from 'Icons/logout-icon-black.svg';
import overviewBlackIcon from 'Icons/overview-icon-black.svg';

import orderWhiteIcon from 'Icons/orders-icon-white.svg';
import helpCenterWhiteIcon from 'Icons/help-center-icon-white.svg';
import wishlistWhiteIcon from 'Icons/wishlist-icon-white.svg';
import addressWhiteIcon from 'Icons/address-icon-white.svg';
import profileWhiteIcon from 'Icons/profile-icon-white.svg';
import settingsWhiteIcon from 'Icons/settings-icon-white.svg';
import overviewWhiteIcon from 'Icons/overview-icon-white.svg';

export const profileListItem = [
  {
    whiteImage: overviewWhiteIcon,
    blackImage: overviewBlackIcon,
    title: 'Overview',
    slug: 'overview',
    description: 'See everyting at a glance',
  },
  {
    blackImage: orderBlackIcon,
    whiteImage: orderWhiteIcon,
    title: 'Orders',
    slug: 'orders',
    description: 'Check your order status'
  },
  {
    blackImage: helpCenterBlackIcon,
    whiteImage: helpCenterWhiteIcon,
    title: 'Help Center',
    slug: 'help-center',
    description: 'Help regarding your recent purchases'
  },
  {
    blackImage: wishlistBlackIcon,
    whiteImage: wishlistWhiteIcon,
    title: 'Wishlist',
    slug: 'wishlist',
    description: 'Your most loved styles'
  },
  {
    blackImage: addressBlackIcon,
    whiteImage: addressWhiteIcon,
    title: 'Address',
    slug: 'address',
    description: 'Save addresses for hassle free checkout'
  },
  {
    blackImage: profileBlackIcon,
    whiteImage: profileWhiteIcon,
    title: 'Profile',
    slug: 'profile',
    description: 'Change your personal details and password'
  },
  {
    blackImage: settingsBlackIcon,
    whiteImage: settingsWhiteIcon,
    title: 'Settings',
    slug: 'settings',
    description: 'Manage notifications & other settings'
  },
  {
    blackImage: logoutBlackIcon,
    title: 'Logout',
    slug: 'logout',
    description: 'Logout from the application'
  }
];