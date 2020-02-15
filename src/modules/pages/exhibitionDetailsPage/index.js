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
import ProductListItem from "CommonComponents/productListItem";

class ExhibitionDetailsPage extends Component {
  render() {
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.exhibition_page_container}>
          <NavHeader title="Exhibition"></NavHeader>

          <DivColumn
            fillParent
            horizontalCenter
            className={styles.exhibition_details_container}
          >
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
                <div className={styles.exhibition_date}>
                  LAST 21 DAYS LEFT TO ENROLL
                </div>
              </DivColumn>
              <CapsuleButton style={{ zIndex: 1 }}>Enroll</CapsuleButton>
            </DivRow>

            <NavHeader title="BASIC DETAILS"></NavHeader>
            <DivRow className={styles.full_description_container}>
              <DivColumn className={styles.left_container}>
                <div className={styles.title}>DESCRIPTION:</div>
                <div className={styles.description}>
                  Missguided is a UK-based fashion retailer that has nearly
                  doubled in size since last year. They integrated Stripe to
                  deliver seamless checkout across mobile and web for customers
                  in 100+ countries, all while automatically combating fraud.
                </div>
              </DivColumn>

              <DivColumn className={styles.right_container}>
                <div className={styles.title}>DATES:</div>
                <div className={styles.date}>
                  <b>STARTS AT:</b> 16 Nov 2020
                </div>
                <div className={styles.date}>
                  <b>STARTS AT:</b> 16 Nov 2020
                </div>
              </DivColumn>
            </DivRow>

            <NavHeader title="PRODUCT DETAILS"></NavHeader>
            <DivRow className={styles.product_list_container}>
              <ProductListItem />
              <ProductListItem />
              <ProductListItem />
              <ProductListItem />
              <ProductListItem />
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
