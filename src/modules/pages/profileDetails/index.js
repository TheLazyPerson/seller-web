import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./profile_details.module.scss";
import NavHeader from "CommonComponents/navHeader";

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
      getBankDetailsAction,
      translate,
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn
          className={`${styles.details_container} ${isRTL ? styles.rtl : ""}`}
        >
          <DivColumn fillParent>
            <MarketPlace></MarketPlace>
          </DivColumn>
          <InitialPageLoader initialPageApi={getProfileDetailsAction}>
            <DivColumn fillParent>
              <NavHeader title={translate("profile_details.title")}>
                <DivRow className={styles.header_button_container}>
                  <SecondaryCapsuleButton
                    className={styles.reset_password_button}
                    onClick={this.navigateToChangePass}
                  >
                    {translate("profile_details.change_passwword")}
                  </SecondaryCapsuleButton>
                  <CapsuleButton onClick={this.navigateToEditProfile}>
                    {translate("profile_details.edit")}
                  </CapsuleButton>
                </DivRow>
              </NavHeader>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>
                  {translate("profile_details.first_name")} :
                </div>
                <div className={styles.value}>
                  {userDetails.first_name
                    ? userDetails.first_name
                    : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>
                  {translate("profile_details.last_name")} :
                </div>
                <div className={styles.value}>
                  {userDetails.last_name
                    ? userDetails.last_name
                    : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>
                  {translate("profile_details.email")} :
                </div>
                <div className={styles.value}>
                  {userDetails.email ? userDetails.email : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>
                  {translate("profile_details.civil_id")} :
                </div>
                <div className={styles.value}>
                  {userDetails.civil_id
                    ? userDetails.civil_id
                    : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>
                  {translate("profile_details.phone_number")} :
                </div>
                <div className={styles.value}>
                  {userDetails.phone ? userDetails.phone : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>
                  {translate("profile_details.gender")} :
                </div>
                <div className={styles.value}>
                  {userDetails.gender ? userDetails.gender : "Not Available"}
                </div>
              </DivColumn>
              <DivColumn className={styles.field_container}>
                <div className={styles.title}>
                  {translate("profile_details.birthday")} :
                </div>
                <div className={styles.value}>
                  {userDetails.birthday
                    ? userDetails.birthday
                    : "Not Available"}
                </div>
              </DivColumn>
            </DivColumn>
          </InitialPageLoader>
          <InitialPageLoader initialPageApi={getBankDetailsAction}>
            <NavHeader title={translate("profile_details.bankdetails")}>
              <DivRow className={styles.header_button_container}>
                <CapsuleButton onClick={this.navigateToEditBankDetails}>
                  {translate("profile_details.edit")}
                </CapsuleButton>
              </DivRow>
            </NavHeader>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>
                {translate("profile_details.bankdetails")}:
              </div>
              <div className={styles.value}>
                {bankDetails.account_holder
                  ? bankDetails.account_holder
                  : "Not Available"}
              </div>
            </DivColumn>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>
                {translate("profile_details.bank_name")} :
              </div>
              <div className={styles.value}>
                {bankDetails.bank_name
                  ? bankDetails.bank_name
                  : "Not Available"}
              </div>
            </DivColumn>
            <DivColumn className={styles.field_container}>
              <div className={styles.title}>
                {translate("profile_details.IBAN")} :
              </div>
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

const mapStateToProps = (state) => {
  return {
    profileDetailsReducer: state.profileDetailsReducer,
    bankDetailsReducer: state.bankDetailsReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getProfileDetailsAction: bindActionCreators(
      getProfileDetailsAction,
      dispatch
    ),
    getBankDetailsAction: bindActionCreators(getBankDetailsAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(ProfileDetails)));
