import paymentsImage from "Images/payment-image.svg";
import orderDelivery from "Images/order-delivery-image.svg";
import servicesOfDelivery from "Images/services-for-delivery.svg";

// export const benefitsListItems = [
//   {
//     heroImage: paymentsImage,
//     title: "Secure Payments, Regularly",
//     slug: "payments",
//     description:
//       "Funds are safely deposited directly to your bank account, even for Pay on Delivery orders, every 7 days."
//   },
//   {
//     heroImage: orderDelivery,
//     title: "Ship your orders, stress-free",
//     slug: "orders",
//     description:
//       "Whether you choose Fulfillment by Home Expo or Easy Ship, let us take care of delivering your products."
//   },
//   {
//     heroImage: servicesOfDelivery,
//     title: "Services to help you through every step",
//     slug: "payments",
//     description:
//       "Get paid support from certified third party professionals for product photography, account management and much more"
//   }
// ];

export const benefitsListItems = [
  {
    heroImage: paymentsImage,
    en: {
      title: "Secure Payments, Regularly",
      description:
        "Funds are safely deposited directly to your bank account, even for Pay on Delivery orders, every 7 days.",
    },
    ar: {
      title: "مدفوعات آمنة بشكل منتظم",
      description:
        "يتم إيداع الأموال بأمان مباشرةً في حسابك المصرفي ، حتى لأوامر الدفع عند التسليم ، كل 7 أيام.",
    },
    slug: "payments",
  },
  {
    heroImage: orderDelivery,
    en: {
      title: "Ship your orders, stress-free",
      description:
        "Whether you choose Fulfillment by Home Expo or Easy Ship, let us take care of delivering your products.",
    },
    ar: {
      title: "اشحن طلباتك ، بدون إجهاد",
      description:
        "سواء اخترت Fulfillment by Home Expo أو Easy Ship ، دعنا نعتني بتقديم منتجاتك.",
    },
    slug: "orders",
  },
  {
    heroImage: servicesOfDelivery,
    en: {
      title: "Services to help you through every step",
      description:
        "Get paid support from certified third party professionals for product photography, account management and much more",
    },
    slug: "payments",
    ar: {
      title: "خدمات لمساعدتك في كل خطوة",
      description:
        "احصل على دعم مدفوع من محترفين معتمدين من جهات خارجية لتصوير المنتجات ، وإدارة الحسابات ، وغير ذلك الكثير",
    },
  },
];
