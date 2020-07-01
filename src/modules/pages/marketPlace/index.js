import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import styles from "./marketPlace.module.scss";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import { getMarketplaceProfileAction } from "Core/modules/marketplaceprofile/marketplaceProfileActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import navigatorHoc from "Hoc/navigatorHoc";
import translatorHoc from "Hoc/translatorHoc";

class MarketPlace extends Component {
  navigateToMarketplaceEditProfile = () => {
    const { navigateTo } = this.props;
    navigateTo("edit-marketplace-profile");
  };

  render() {
    const {
      marketplaceProfileReducer: { profile },
      getMarketplaceProfileAction,
      isRTL,
      translate,
    } = this.props;

    return (
      // <SectionedContainer sideBarContainer={<SideNav />}>
      // <SectionedContainer>
      <DivColumn
        className={`${styles.details_container} ${isRTL ? styles.rtl : ""}`}
      >
        <NavHeader title={translate("marketplace_profile_details.title")}>
          <DivRow className={styles.header_button_container}>
            <CapsuleButton onClick={this.navigateToMarketplaceEditProfile}>
              {translate("marketplace_profile_details.edit")}
            </CapsuleButton>
          </DivRow>
        </NavHeader>
        <InitialPageLoader initialPageApi={getMarketplaceProfileAction}>
          <DivColumn fillParent>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>
                {" "}
                {translate("marketplace_profile_details.shop_name")} :
              </div>
              <div className={styles.value}>
                {profile.shop_name ? profile.shop_name : "Not Available"}
              </div>
            </DivColumn>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>
                {translate("marketplace_profile_details.contact_number")} :
              </div>
              <div className={styles.value}>
                {profile.contact_number
                  ? profile.contact_number
                  : "Not Available"}
              </div>
            </DivColumn>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>
                {translate("marketplace_profile_details.email_address")}:
              </div>
              <div className={styles.value}>
                {profile.shop_email ? profile.shop_email : "Not Available"}
              </div>
            </DivColumn>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>
                {translate("marketplace_profile_details.address")} :
              </div>
              <div className={styles.value}>
                <span>
                  {profile.area},{profile.block_number}, {profile.house_number},
                  {profile.street_number}, {profile.avenue} , {profile.landmark}
                  - {profile.city}
                </span>
              </div>
            </DivColumn>
          </DivColumn>
        </InitialPageLoader>
      </DivColumn>
      // </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    marketplaceProfileReducer: state.marketplaceProfileReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getMarketplaceProfileAction: bindActionCreators(
      getMarketplaceProfileAction,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(MarketPlace)));
