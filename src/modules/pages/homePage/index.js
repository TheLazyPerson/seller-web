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
import { getOverviewAction } from "Core/modules/overview/overviewAction";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import isEmpty from "lodash/isEmpty";

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

  getListItem = listItem => {
    return (
      <DivColumn verticalCenter horizontalCenter className={styles.box}>
        <div className={styles.title}>{listItem.value}</div>
        <div className={styles.description}>{listItem.title}</div>
      </DivColumn>
    );
  };

  render() {
    const {
      overviewReducer: { overviewData },
      signInReducer: { userDetails },
      getOverviewAction
    } = this.props;
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn className={styles.profile_overview_container}>
          <DivColumn
            verticalCenter
            horizontalCenter
            className={styles.header_container}
          >
            <div className={styles.header_title}>MY ACCOUNT</div>
            <div className={styles.header_message}>
              Welcome, {!isEmpty(userDetails) && userDetails.first_name}.
            </div>
          </DivColumn>
          <InitialPageLoader
            initialPageApi={getOverviewAction}
            isEmpty={isEmpty(overviewData)}
          >
            <DivRow className={styles.box_container}>
              {map(overviewData, overview => {
                return this.getListItem(overview);
              })}
            </DivRow>
          </InitialPageLoader>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    overviewReducer: state.overviewReducer,
    signInReducer: state.signInReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    logoutAction: bindActionCreators(logoutAction, dispatch),
    getOverviewAction: bindActionCreators(getOverviewAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(HomePage));
