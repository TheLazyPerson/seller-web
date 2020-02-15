import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./subscription.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import DataTable, { createTheme } from "react-data-table-component";
import differenceBy from "lodash/differenceBy";
import SearchBarComponent from "CommonComponents/searchBarComponent";

class SubscriptionPage extends Component {
  state = {};

  render() {
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.subscription_page_container}>
          <NavHeader title="Subscription Details"></NavHeader>

          <DivColumn
            fillParent
            className={styles.content_container}
          ></DivColumn>
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

export default connect(null, mapDispathToProps)(navigatorHoc(SubscriptionPage));
