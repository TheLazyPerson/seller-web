import React, { Component } from "react";
import { profileListItem } from "Constants/profileConstants";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import styles from "./side_nav.module.scss";
import map from "lodash/map";
import navigatorHoc from "Hoc/navigatorHoc";

class SideNav extends Component {
  state = {
    selectedRoute: ""
  };

  componentDidMount() {
    this.validateAndSelectRoute(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.validateAndSelectRoute(nextProps);
  }

  validateAndSelectRoute = props => {
    const {
      location: { pathname }
    } = props;
    const { selectedRoute } = this.state;

    let setRoute = "";

    switch (pathname) {
      case "/profile":
        setRoute = "overview";
        break;
      case "/profile/orders":
      case "/profile/orders/details":
        setRoute = "orders";
        break;
      case "/profile/address":
      case "/profile/address/add":
        setRoute = "address";
        break;
      case "/profile/settings":
        setRoute = "settings";
        break;
      case "/profile/details":
      case "/profile/details/change-password":
      case "/profile/details/edit-profile":
        setRoute = "profile";
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
        selectedRoute: setRoute
      });
    }
  };

  onClickNavItemClick = slug => {
    const { navigateTo } = this.props;
    if (slug === "overview") {
      navigateTo("profile");
    } else if (slug === "profile") {
      navigateTo("profile-details");
    } else {
      navigateTo(slug);
    }
  };

  render() {
    const { selectedRoute } = this.state;

    return (
      <DivColumn verticalCenter className={styles.side_nav_container}>
        {map(profileListItem, listItem => {
          if (listItem.title !== "Logout") {
            const isSelected = selectedRoute === listItem.slug;

            return (
              <DivRow
                className={`${styles.nav_item} ${
                  isSelected ? styles.is_selected : ""
                }`}
                onClick={() => this.onClickNavItemClick(listItem.slug)}
              >
                <img
                  className={styles.nav_image}
                  src={isSelected ? listItem.blackImage : listItem.whiteImage}
                  alt="nav"
                />
                <DivColumn>
                  <div className={styles.nav_title}>{listItem.title}</div>
                  <div className={styles.nav_description}>
                    {listItem.description}
                  </div>
                </DivColumn>
                <div className={styles.nav_indicator}>></div>
              </DivRow>
            );
          }
          return null;
        })}
      </DivColumn>
    );
  }
}

export default navigatorHoc(SideNav);
