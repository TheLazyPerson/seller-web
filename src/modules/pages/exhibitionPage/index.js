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

class HomePage extends Component {
  render() {
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.exhibition_page_container}>
          <NavHeader title="Exhibitions" />
          <DivColumn fillParent className={styles.content_container}>
            <DivRow>
              {/* listItem */}
              <img />
              <DivColumn>
                <div>Header</div>
                <div>description</div>

                <DivRow>
                  <div>Category:</div>
                  <div>values mentioned here</div>
                </DivRow>

                <DivRow>
                  <div>Starts At:</div>
                  <div>values mentioned here</div>
                </DivRow>

                <DivRow>
                  <div>Ends On:</div>
                  <div>values mentioned here</div>
                </DivRow>

                <DivRow>
                  <div>LAST 21 DAYS LEFT TO ENROLL</div>
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
)(navigatorHoc(HomePage));
