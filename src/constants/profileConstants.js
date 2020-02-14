import orderBlackIcon from "Icons/order-icon-black.svg";
import helpCenterBlackIcon from "Icons/help-center-icon-black.svg";
import wishlistBlackIcon from "Icons/wishlist-icon-black.svg";
import addressBlackIcon from "Icons/address-icon-black.svg";
import profileBlackIcon from "Icons/profile-icon-black.svg";
import settingsBlackIcon from "Icons/settings-icon-black.svg";
import logoutBlackIcon from "Icons/logout-icon-black.svg";
import overviewBlackIcon from "Icons/overview-icon-black.svg";

import orderWhiteIcon from "Icons/order-icon-white.svg";
import helpCenterWhiteIcon from "Icons/help-center-icon-white.svg";
import wishlistWhiteIcon from "Icons/wishlist-icon-white.svg";
import addressWhiteIcon from "Icons/address-icon-white.svg";
import profileWhiteIcon from "Icons/profile-icon-white.svg";
import settingsWhiteIcon from "Icons/settings-icon-white.svg";
import overviewWhiteIcon from "Icons/overview-icon-white.svg";
import exhibitionBlackIcon from "Icons/exhibition-icon-black.svg";
import exhibitionWhiteIcon from "Icons/exhibition-icon-white.svg";
import productWhiteIcon from "Icons/product-icon-white.svg";
import salesWhiteIcon from "Icons/sales-icon-white.svg";
import marketplaceProfileWhiteIcon from "Icons/marketplace-profile-icon-white.svg";
import subscriptionWhiteIcon from "Icons/subscription-icon-white.svg";

export const profileListItem = [
  {
    type: "no-header",
    items: [
      {
        whiteImage: overviewWhiteIcon,
        blackImage: overviewBlackIcon,
        title: "Overview",
        slug: "overview",
        description: "See everyting at a glance"
      }
    ]
  },
  {
    type: "header",
    name: "MarketPlace",
    items: [
      {
        blackImage: exhibitionBlackIcon,
        whiteImage: exhibitionWhiteIcon,
        title: "Exhibitions",
        slug: "exhibitions",
        description: "Check different exhibition currently live"
      },
      {
        blackImage: orderBlackIcon,
        whiteImage: orderWhiteIcon,
        title: "Orders",
        slug: "orders",
        description: "Check your order status"
      },
      {
        blackImage: orderBlackIcon,
        whiteImage: salesWhiteIcon,
        title: "Sales",
        slug: "sales",
        description: "See your sales overview"
      },
      {
        blackImage: orderBlackIcon,
        whiteImage: marketplaceProfileWhiteIcon,
        title: "Marketplace Profile",
        slug: "marketplace-profile",
        description: "See your marketplace profile"
      },
      {
        blackImage: orderBlackIcon,
        whiteImage: productWhiteIcon,
        title: "Products",
        slug: "products",
        description: "Manage listed products"
      }
    ]
  },
  {
    type: "header",
    name: "Account",
    items: [
      {
        blackImage: addressBlackIcon,
        whiteImage: addressWhiteIcon,
        title: "Address",
        slug: "address",
        description: "See all your addresses"
      },
      {
        blackImage: profileBlackIcon,
        whiteImage: profileWhiteIcon,
        title: "Profile Details",
        slug: "profile-details",
        description: "Change your personal details and password"
      },
      {
        blackImage: settingsBlackIcon,
        whiteImage: subscriptionWhiteIcon,
        title: "Subscription",
        slug: "subsciption",
        description: "Check your subscription details"
      },
      {
        blackImage: settingsBlackIcon,
        whiteImage: settingsWhiteIcon,
        title: "Settings",
        slug: "settings",
        description: "Manage notifications & other settings"
      }
    ]
  },
  {
    type: "header",
    name: "Help",
    items: [
      {
        blackImage: helpCenterBlackIcon,
        whiteImage: helpCenterWhiteIcon,
        title: "Help Center",
        slug: "help-center",
        description: "All in one stop for any help"
      }
    ]
  }
];
