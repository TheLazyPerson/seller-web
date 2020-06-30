import React, { Component } from "react";
import { profileListItem } from "Constants/profileConstants";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import styles from "./side_nav.module.scss";
import map from "lodash/map";
import navigatorHoc from "Hoc/navigatorHoc";
import includes from "lodash/includes";
import translatorHoc from "Hoc/translatorHoc";
import { connect } from "react-redux";

class SideNav extends Component {
  state = {
    selectedRoute: "",
  };

  componentDidMount() {
    this.validateAndSelectRoute(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.validateAndSelectRoute(nextProps);
  }

  validateAndSelectRoute = (props) => {
    const {
      location: { pathname },
    } = props;
    const { selectedRoute } = this.state;

    let setRoute = "";

    switch (pathname) {
      case "/profile":
        setRoute = "overview";
        break;
      case "/orders":
      case includes(pathname, "/orders/details/")
        ? pathname
        : "/orders/details":
      case includes(pathname, "/orders/shipping/")
        ? pathname
        : "/orders/shipping":
        setRoute = "orders";
        break;
      case "/products":
      case "/product/add":
      case includes(pathname, "/product/details/")
        ? pathname
        : "/product/details/":
      case includes(pathname, "/product/edit/") ? pathname : "/product/edit/":
        setRoute = "products";
        break;
      case "/sales":
      case includes(pathname, "/sales/details/") ? pathname : "/sales/details":
        setRoute = "sales";
        break;
      case "/exhibitions":
      case includes(pathname, "/exhibition/details/")
        ? pathname
        : "/exhibition/details/":
      case includes(pathname, "/exhibition/subscribe/")
        ? pathname
        : "/exhibition/subscribe/":
      case "/exhibition/enrolled":
        setRoute = "exhibitions";
        break;
      case "/profile/address":
      case "/profile/address/add":
        setRoute = "address";
        break;
      case "/profile/settings":
        setRoute = "settings";
        break;
      case "/marketplace":
      case "/marketplace/edit-marketplace-profile":
        setRoute = "marketplace-profile";
        break;
      case "/profile/details":
      case "/profile/details/change-password":
      case "/profile/details/edit-profile":
      case "/profile/details/edit-bank-details":
        setRoute = "profile-details";
        break;
      case "/subscription":
        setRoute = "subscription";
        break;

      case "/profile/helpcenter":
        setRoute = "help-center";
        break;
      default:
        setRoute = "overview";
        break;
    }

    if (setRoute !== selectedRoute) {
      this.setState({
        selectedRoute: setRoute,
      });
    }
  };

  onClickNavItemClick = (slug) => {
    const { navigateTo } = this.props;
    if (slug === "overview") {
      navigateTo("home");
    } else if (slug === "profile") {
    } else if (slug === "marketplace-profile") {
      navigateTo("marketplace");
    } else if (slug === "profile-details") {
      navigateTo("profile-details");
    } else {
      navigateTo(slug);
    }
  };

  getListItem = (isSelected, listItem) => {
    const {
      languageReducer: { languageCode },
      isRTL,
    } = this.props;
    return (
      <DivRow
        className={styles.nav_item}
        onClick={() => this.onClickNavItemClick(listItem.slug)}
      >
        <img
          className={styles.nav_image}
          src={isSelected ? listItem.blackImage : listItem.whiteImage}
          alt="nav"
        />
        <DivColumn className={styles.text_container}>
          <div className={styles.nav_title}>{listItem[languageCode].title}</div>
          <div className={styles.nav_description}>
            {listItem[languageCode].description}
          </div>
        </DivColumn>
        <div className={styles.nav_indicator}>></div>
      </DivRow>
    );
  };

  render() {
    const { selectedRoute } = this.state;
    const {
      languageReducer: { languageCode },
      isRTL,
    } = this.props;
    return (
      <DivColumn
        verticalCenter
        className={` ${isRTL ? styles.rtl : styles.side_nav_container}`}
      >
        {map(profileListItem, (listItem) => {
          const { type, name, items: subProfileList } = listItem;

          if (type == "no-header") {
            return map(subProfileList, (subProfileListItem) => {
              const isSelected = selectedRoute === subProfileListItem.slug;
              return this.getListItem(isSelected, subProfileListItem);
            });
          }

          return (
            <DivColumn className={styles.list_container}>
              <div className={styles.list_header}>
                {listItem[languageCode].name}
              </div>
              <DivColumn className={styles.list_container}>
                {map(subProfileList, (subProfileListItem) => {
                  const isSelected = selectedRoute === subProfileListItem.slug;
                  return this.getListItem(isSelected, subProfileListItem);
                })}
              </DivColumn>
            </DivColumn>
          );
        })}
      </DivColumn>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageReducer: state.languageReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

export default connect(
  mapStateToProps,
  null
)(navigatorHoc(translatorHoc(SideNav)));
