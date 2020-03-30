import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./profile_details.module.scss";
import NavHeader from "CommonComponents/navHeader";

import map from "lodash/map";
import CapsuleButton from "CommonComponents/capsuleButton";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";
import { getProfileDetailsAction } from "Core/modules/profiledetails/profileDetailsActions";
import { getBankDetailsAction } from "Core/modules/bankDetails/bankDetailsActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import navigatorHoc from "Hoc/navigatorHoc";
import translatorHoc from "Hoc/translatorHoc";
import MarketPlace from "../marketPlace";
class ProfileDetails extends Component {
  navigateToChangePass = () => {
    const { navigateTo } = this.props;
    navigateTo("change-password");
  };

  navigateToEditProfile = () => {
    const { navigateTo } = this.props;
    navigateTo("edit-profile");
  };

  navigateToEditBankDetails = () => {
    const { navigateTo } = this.props;
    navigateTo("edit-bank-details");
  };

  render() {
    const {
      profileDetailsReducer: { userDetails },
      getProfileDetailsAction,
      isRTL,
      bankDetailsReducer: { bankDetails },
      getBankDetailsAction
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn
          className={`${styles.details_container} ${isRTL ? styles.rtl : ""}`}
        >
          <InitialPageLoader initialPageApi={getProfileDetailsAction}>
            <DivColumn fillParent>
              <DivColumn fillParent>
                <MarketPlace></MarketPlace>
              </DivColumn>
              <NavHeader title="profile details">
                <DivRow className={styles.header_button_container}>
                  <SecondaryCapsuleButton
                    className={styles.reset_password_button}
                    onClick={this.navigateToChangePass}
                  >
                    Change Password
                  </SecondaryCapsuleButton>
                  <CapsuleButton onClick={this.navigateToEditProfile}>
                    Edit
                  </CapsuleButton>
                </DivRow>
              </NavHeader>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>First Name :</div>
                <div className={styles.value}>
                  {userDetails.first_name
                    ? userDetails.first_name
                    : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>Last Name :</div>
                <div className={styles.value}>
                  {userDetails.last_name
                    ? userDetails.last_name
                    : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>Email :</div>
                <div className={styles.value}>
                  {userDetails.email ? userDetails.email : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>Civil ID :</div>
                <div className={styles.value}>
                  {userDetails.civil_id
                    ? userDetails.civil_id
                    : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>Phone Number :</div>
                <div className={styles.value}>
                  {userDetails.phone ? userDetails.phone : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>Gender :</div>
                <div className={styles.value}>
                  {userDetails.gender ? userDetails.gender : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>Birthday :</div>
                <div className={styles.value}>
                  {userDetails.birthday
                    ? userDetails.birthday
                    : "Not Available"}
                </div>
              </DivColumn>
            </DivColumn>
          </InitialPageLoader>
          <InitialPageLoader initialPageApi={getBankDetailsAction}>
            <NavHeader title="bank details">
              <DivRow className={styles.header_button_container}>
                <CapsuleButton onClick={this.navigateToEditBankDetails}>
                  Edit
                </CapsuleButton>
              </DivRow>
            </NavHeader>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>Account Holder :</div>
              <div className={styles.value}>
                {bankDetails.account_holder
                  ? bankDetails.account_holder
                  : "Not Available"}
              </div>
            </DivColumn>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>Bank Name :</div>
              <div className={styles.value}>
                {bankDetails.bank_name
                  ? bankDetails.bank_name
                  : "Not Available"}
              </div>
            </DivColumn>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>IBAN :</div>
              <div className={styles.value}>
                {bankDetails.iban ? bankDetails.iban : "Not Available"}
              </div>
            </DivColumn>
          </InitialPageLoader>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    profileDetailsReducer: state.profileDetailsReducer,
    bankDetailsReducer: state.bankDetailsReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    getProfileDetailsAction: bindActionCreators(
      getProfileDetailsAction,
      dispatch
    ),
    getBankDetailsAction: bindActionCreators(getBankDetailsAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(ProfileDetails)));
