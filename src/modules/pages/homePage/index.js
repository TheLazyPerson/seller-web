import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./homepage.module.scss";
import { profileListItem } from "Constants/profileConstants";
import SideNav from "./components/sideNav";
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
        CookieService.delete('BAG_COUNT');
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

          <DivRow className={styles.items_container}>
            {map(profileListItem, listItem => {
              if (listItem.title !== "Overview") {
                return (
                  <DivColumn
                    verticalCenter
                    horizontalCenter
                    className={styles.grid_item}
                    onClick={() => this.onClickNavItemClick(listItem.slug)}
                  >
                    <img
                      className={styles.item_image}
                      src={listItem.blackImage}
                      alt="item"
                    />
                    <div className={styles.item_title}>{listItem.title}</div>
                    <div className={styles.item_description}>
                      {listItem.description}
                    </div>
                  </DivColumn>
                );
              }
              return null;
            })}
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
