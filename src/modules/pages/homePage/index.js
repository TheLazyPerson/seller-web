import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./homepage.module.scss";
import { profileListItem } from "Constants/profileConstants";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";

class HomePage extends Component {
  onClickNavItemClick = slug => {
    const { navigateTo, logoutAction } = this.props;

    if (slug === "overview") {
      navigateTo("profile");
    } else if (slug === "profile") {
      navigateTo("profile-details");
    } else if (slug === "logout") {
      logoutAction().then(() => {
        CookieService.delete(USER_DATA_COOKIE);
        CookieService.delete("BAG_COUNT");
        navigateTo(""); // ToHomePage
      });
    } else {
      navigateTo(slug);
    }
  };

  render() {
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn className={styles.profile_overview_container}>
          <DivColumn
            verticalCenter
            horizontalCenter
            className={styles.header_container}
          >
            <div className={styles.header_title}>MY ACCOUNT</div>
            <div className={styles.header_message}>Welcome, Omar.</div>
          </DivColumn>

          <DivRow className={styles.box_container}>
            <DivColumn verticalCenter horizontalCenter className={styles.box}>
              <div className={styles.title}>20</div>
              <div className={styles.description}>NEW ORDERS</div>
            </DivColumn>

            <DivColumn verticalCenter horizontalCenter className={styles.box}>
              <div className={styles.title}>20</div>
              <div className={styles.description}>INCOMPLETE ORDERS</div>
            </DivColumn>

            <DivColumn verticalCenter horizontalCenter className={styles.box}>
              <div className={styles.title}>200</div>
              <div className={styles.description}>AVERAGE ORDER SALE</div>
            </DivColumn>

            <DivColumn verticalCenter horizontalCenter className={styles.box}>
              <div className={styles.title}>30</div>
              <div className={styles.description}>TOTAL ORDERS</div>
            </DivColumn>
          </DivRow>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapDispathToProps = dispatch => {
  return {
    logoutAction: bindActionCreators(logoutAction, dispatch)
  };
};

export default connect(null, mapDispathToProps)(navigatorHoc(HomePage));
