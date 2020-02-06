import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from 'CommonComponents/capsuleButton';
import map from "lodash/map";
import styles from "./exhibition_page.module.scss";
import { profileListItem } from "Constants/profileConstants";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";

class ExhibitionListingPage extends Component {
  render() {
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.exhibition_page_container}>
          <NavHeader title="Exhibitions">
            <CapsuleButton>Your Exhibitions</CapsuleButton>
          </NavHeader>
          <DivColumn fillParent className={styles.content_container}>
            <DivRow className={styles.item}>
              {/* listItem */}
              <img className={styles.image}/>

              <DivColumn className={styles.item_content}>
                <div className={styles.title}>Header</div>
                <div className={styles.description}>description</div>

                <DivRow>
                  <div className={styles.category_header}>Category:</div>
                  <div className={styles.category_value}>values mentioned here</div>
                </DivRow>

                <DivRow className={styles.date_container}>
                  <div className={styles.date_title}>Starts At:</div>
                  <div className={styles.date_value}>values mentioned here</div>
                </DivRow>

                <DivRow className={styles.date_container}>
                  <div className={styles.date_title}>Ends On:</div>
                  <div className={styles.date_value}>values mentioned here</div>
                </DivRow>

                <DivRow className={styles.action_container}>
                  <div className={styles.last_date}>LAST 21 DAYS LEFT TO ENROLL</div>
                  <CapsuleButton>values mentioned here</CapsuleButton>
                </DivRow>
              </DivColumn>
            </DivRow>
          </DivColumn>
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

export default connect(
  null,
  mapDispathToProps
)(navigatorHoc(ExhibitionListingPage));
