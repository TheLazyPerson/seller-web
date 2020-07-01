import selfShipImage from "Images/self-ship.svg";
import fullDelivery from "Images/fulfilment-by-us.svg";

export const deliveringOrdersItems = [
  {
    heroImage: selfShipImage,
    en: {
      title: "Self-Ship, orders",
      description: "You store, pack & deliver your products",
    },
    ar: {
      title: "السفينة الذاتية ، أوامر",
      description: "تقوم بتخزين وتغليف وتسليم منتجاتك",
    },
    slug: "self-ship",
  },
  {
    heroImage: fullDelivery,
    slug: "fulfillment-provided",
    en: {
      title: "Fulfilment by, Home Expo",
      description: "Home Expo stores, packs & delivers your products",
    },
    ar: {
      title: "وفاء من هوم اكسبو",
      description: "يقوم Home Expo بتخزين منتجاتك وحزمها وتسليمها.",
    },
  },
];
