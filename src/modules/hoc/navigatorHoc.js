import React, { Component } from "react";
import { withRouter } from "react-router";

const navigatorHoc = WrappedComponent => {
  class navigator extends Component {
    navigateTo = (pageName, data = null) => {
      const { push } = this.props.history;
      this.navigateScreen(push, pageName, data);
    };

    replaceTo = (pageName, data = null) => {
      const { replace } = this.props.history;
      this.navigateScreen(replace, pageName, data);
    };

    pop = () => {
      const { goBack } = this.props.history;

      goBack();
    };

    navigateScreen = (navigationFunction, pageName, data) => {
      switch (pageName) {
        case "home":
          return navigationFunction("/home");

        case "exhibitions":
          return navigationFunction("/exhibitions");

        case "exhibition-details":
          return navigationFunction(`/exhibition/details/${data.id}`);

        case "your-exhibitions":
          return navigationFunction("/exhibition/enrolled");

        case "exhibition-subscribe":
          return navigationFunction(`/exhibition/subscribe/${data.id}`);

        case "products":
          return navigationFunction("/products");

        case "add-product":
          return navigationFunction("/product/add");

        case "edit-product":
          return navigationFunction(`/product/edit/${data.productId}`);

        case "product-details":
          return navigationFunction(`/product/details/${data.productId}`);

        case "sales":
          return navigationFunction("/sales");

        case "sales-details":
          return navigationFunction(`/sales/details/${data.transactionId}`);

        case "plp":
          return navigationFunction(`/product-listing/?id=${data.id}`);

        case "pdp":
          return navigationFunction(
            `/product-details/?exhibitionid=${data.exhibitionId}&productid=${data.productId}`
          );

        case "checkout":
          return navigationFunction("/checkout");

        case "place-order":
          return navigationFunction("/place-order");

        case "select-payment":
          return navigationFunction("/select-payment");

        case "signin":
          return navigationFunction("/signin");

        case "forgot-password":
          return navigationFunction("/forgot-password");

        case "signup":
          return navigationFunction("/signup");

        case "profile":
          return navigationFunction("/profile");

        case "orders":
          return navigationFunction("/orders");

        case "order-details":
          return navigationFunction(`/order/details/${data.orderId}`);

        case "help-center":
          return navigationFunction("/profile/helpcenter");

        case "wishlist":
          return navigationFunction("/wishlist");

        case "address":
          return navigationFunction("/profile/address");

        case "add-address":
          return navigationFunction("/profile/address/add");

        case "edit-address":
          return navigationFunction(`/profile/address/edit/?id=${data.id}`);

        case "profile-details":
          return navigationFunction("/profile/details");

        case "subscription":
          return navigationFunction("/subscription");

        case "settings":
          return navigationFunction("/profile/settings");

        case "change-password":
          return navigationFunction("/profile/details/change-password");

        case "edit-profile":
          return navigationFunction("/profile/details/edit-profile");

        case "trending-exhibitions":
          return navigationFunction("/trending-exhibitions");

        case "faq":
          return navigationFunction("/faq");

        case "search":
          return navigationFunction(
            `/search/${data.searchType.toLowerCase()}?query=${data.searchText}`
          );

        case "marketplace":
          return navigationFunction("/marketplace");

        case "edit-marketplace-profile":
          return navigationFunction("/marketplace/edit-marketplace-profile");

        case "edit-bank-details":
          return navigationFunction("/profile/details/edit-bank-details");

        default:
          return navigationFunction("/");
      }
    };

    render() {
      return (
        <WrappedComponent
          navigateTo={this.navigateTo}
          replaceTo={this.replaceTo}
          pop={this.pop}
          {...this.props}
        />
      );
    }
  }

  return withRouter(navigator);
};

export default navigatorHoc;
