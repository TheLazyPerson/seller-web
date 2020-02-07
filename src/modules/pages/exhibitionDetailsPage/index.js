import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./exhibition_details.module.scss";
import { profileListItem } from "Constants/profileConstants";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import exhibitionImage from "Images/exhibition-item-3.png";

class ExhibitionDetailsPage extends Component {
  render() {
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.exhibition_page_container}>
          <NavHeader title="Exhibition"></NavHeader>

          <DivColumn fillParent horizontalCenter className={styles.exhibition_details_container}>
            <DivRow
              className={styles.exhibition_banner_container}
              style={{
                background: `url(${exhibitionImage}) center no-repeat`,
                backgroundSize: "cover"
              }}
            >
            <div className={styles.overlay_gradient}></div>

              <DivColumn className={styles.banner_content}>
                <div className={styles.exhibition_name}>Watches</div>
                <div className={styles.exhibition_description}>
                  Missguided is a UK-based fashion retailer that has nearly
                  doubled in size since last year. They integrated Stripe to
                  deliver seamless
                </div>
                <div className={styles.exhibition_date}>LAST 21 DAYS LEFT TO ENROLL</div>
              </DivColumn>
              <CapsuleButton style={{zIndex: 1}}>Enroll</CapsuleButton>
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
)(navigatorHoc(ExhibitionDetailsPage));
