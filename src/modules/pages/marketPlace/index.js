import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./marketPlace.module.scss";
import NavHeader from "CommonComponents/navHeader";

import map from "lodash/map";
import CapsuleButton from "CommonComponents/capsuleButton";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";
import { getMarketplaceProfileAction } from "Core/modules/marketplaceprofile/marketplaceProfileActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import navigatorHoc from "Hoc/navigatorHoc";
import translatorHoc from "Hoc/translatorHoc";
import isEmpty from "lodash/isEmpty";

class MarketPlace extends Component {
  navigateToMarketplaceEditProfile = () => {
    const { navigateTo } = this.props;
    navigateTo("edit-marketplace-profile");
  };

  render() {
    const {
      marketplaceProfileReducer: { profile },
      getMarketplaceProfileAction,
      isRTL
    } = this.props;

    return (
      // <SectionedContainer sideBarContainer={<SideNav />}>
      // <SectionedContainer>
      <DivColumn
        className={`${styles.details_container} ${isRTL ? styles.rtl : ""}`}
      >
        <NavHeader title="Marketplace Profile details">
          <DivRow className={styles.header_button_container}>
            <CapsuleButton onClick={this.navigateToMarketplaceEditProfile}>
              Edit
            </CapsuleButton>
          </DivRow>
        </NavHeader>
        <InitialPageLoader initialPageApi={getMarketplaceProfileAction}>
          <DivColumn fillParent>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>Shop Name</div>
              <div className={styles.value}>
                {profile.shop_name ? profile.shop_name : "Not Available"}
              </div>
            </DivColumn>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>Contact Number</div>
              <div className={styles.value}>
                {profile.contact_number
                  ? profile.contact_number
                  : "Not Available"}
              </div>
            </DivColumn>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>Email Address</div>
              <div className={styles.value}>
                {profile.shop_email ? profile.shop_email : "Not Available"}
              </div>
            </DivColumn>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>Address</div>
              <div className={styles.value}>
                {!isEmpty(profile.shop_address) && (
                  <span>
                    {profile.shop_address.address1},{profile.shop_address.city},{" "}
                    {profile.shop_address.state},{profile.shop_address.country}{" "}
                    - {profile.shop_address.postcode}
                  </span>
                )}
              </div>
            </DivColumn>
          </DivColumn>
        </InitialPageLoader>
      </DivColumn>
      // </SectionedContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    marketplaceProfileReducer: state.marketplaceProfileReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    getMarketplaceProfileAction: bindActionCreators(
      getMarketplaceProfileAction,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(MarketPlace)));
