import orderBlackIcon from "Icons/order-icon-black.svg";
import helpCenterBlackIcon from "Icons/help-center-icon-black.svg";
import profileBlackIcon from "Icons/profile-icon-black.svg";
import settingsBlackIcon from "Icons/settings-icon-black.svg";
import overviewBlackIcon from "Icons/overview-icon-black.svg";

import orderWhiteIcon from "Icons/order-icon-white.svg";
import helpCenterWhiteIcon from "Icons/help-center-icon-white.svg";
import profileWhiteIcon from "Icons/profile-icon-white.svg";
import settingsWhiteIcon from "Icons/settings-icon-white.svg";
import overviewWhiteIcon from "Icons/overview-icon-white.svg";
import exhibitionBlackIcon from "Icons/exhibition-icon-black.svg";
import exhibitionWhiteIcon from "Icons/exhibition-icon-white.svg";
import productWhiteIcon from "Icons/product-icon-white.svg";
import productBlackIcon from "Icons/product-icon-black.svg";
import salesWhiteIcon from "Icons/sales-icon-white.svg";
import salesBlackIcon from "Icons/sales-icon-black.svg";
import subscriptionWhiteIcon from "Icons/subscription-icon-white.svg";
import subscriptionBlackIcon from "Icons/subscription-icon-black.svg";

export const profileListItem = [
  {
    type: "no-header",
    items: [
      {
        whiteImage: overviewWhiteIcon,
        blackImage: overviewBlackIcon,
        slug: "overview",
        en: {
          title: "Overview",
          description: "See everyting at a glance",
        },
        ar: {
          title: "نظرة عامة",
          description: "انظر كل شيء في لمحة",
        },
      },
    ],
  },
  {
    type: "header",
    en: {
      name: "MarketPlace",
    },
    ar: {
      name: "المتجر",
    },
    items: [
      {
        blackImage: exhibitionBlackIcon,
        whiteImage: exhibitionWhiteIcon,
        slug: "exhibitions",
        en: {
          title: "Exhibitions",
          description: "Check different exhibition currently live",
        },
        ar: {
          title: "المعارض",
          description: "تحقق من المعارض المختلفة على الهواء مباشرة",
        },
      },
      {
        blackImage: orderBlackIcon,
        whiteImage: orderWhiteIcon,
        slug: "orders",

        en: {
          title: "Orders",
          description: "Check your order status",
        },
        ar: {
          title: "الطلب #٪ s",
          description: "تحقق من حالة طلبك",
        },
      },
      {
        blackImage: salesBlackIcon,
        whiteImage: salesWhiteIcon,
        slug: "sales",
        en: {
          title: "Sales",
          description: "See your sales overview",
        },
        ar: {
          title: "مبيعات",
          description: "انظر نظرة عامة على المبيعات الخاصة بك",
        },
      },
      // {
      //   blackImage: marketplaceProfileBlackIcon,
      //   whiteImage: marketplaceProfileWhiteIcon,
      //   title: "Marketplace Profile",
      //   slug: "marketplace-profile",
      //   description: "See your marketplace profile"
      // },
      {
        blackImage: productBlackIcon,
        whiteImage: productWhiteIcon,
        slug: "products",
        en: {
          title: "Products",
          description: "Manage listed products",
        },
        ar: {
          title: "منتجات",
          description: "إدارة المنتجات المدرجة",
        },
      },
    ],
  },
  {
    type: "header",
    en: {
      name: "Account",
    },
    ar: {
      name: "الحساب",
    },
    items: [
      // {
      //   blackImage: addressBlackIcon,
      //   whiteImage: addressWhiteIcon,
      //   title: "Address",
      //   slug: "address",
      //   description: "See all your addresses"
      // },
      {
        blackImage: profileBlackIcon,
        whiteImage: profileWhiteIcon,
        slug: "profile-details",
        en: {
          title: "Profile",
          description: "Change your personal details and password",
        },
        ar: {
          title: "الملف الشخصي",
          description: "قم بتغيير التفاصيل الشخصية وكلمة المرور الخاصة بك",
        },
      },
      {
        blackImage: subscriptionBlackIcon,
        whiteImage: subscriptionWhiteIcon,
        slug: "subscription",

        en: {
          title: "Subscription",
          description: "Check your subscription details",
        },
        ar: {
          title: "اشتراك",
          description: "تحقق من تفاصيل اشتراكك",
        },
      },
      {
        blackImage: settingsBlackIcon,
        whiteImage: settingsWhiteIcon,
        slug: "settings",
        en: {
          title: "Settings",
          description: "Manage notifications & other settings",
        },
        ar: {
          title: "الإعدادات",
          description: "إدارة الإخطارات والإعدادات الأخرى",
        },
      },
    ],
  },
  {
    type: "header",
    en: {
      name: "Help",
    },
    ar: {
      name: "مساعدة",
    },
    items: [
      {
        blackImage: helpCenterBlackIcon,
        whiteImage: helpCenterWhiteIcon,
        slug: "help-center",
        en: {
          title: "Help Center",
          description: "Help regarding your recent purchases",
        },
        ar: {
          title: "مركز المساعدة",
          description: "مساعدة بخصوص مشترياتك الأخيرة",
        },
      },
    ],
  },
];
