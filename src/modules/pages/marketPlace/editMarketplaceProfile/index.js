import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./edit_marketplace_profile.module.scss";
import NavHeader from "CommonComponents/navHeader";
import { Form, Field } from "react-final-form";
import CapsuleButton from "CommonComponents/capsuleButton";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";
import InputTextComponent from "CommonComponents/InputTextComponent";
import navigatorHoc from "Hoc/navigatorHoc";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import {
  getMarketplaceProfileAction,
  editMarketplaceProfileAction,
  selectMarketplaceAddress,
} from "Core/modules/marketplaceprofile/marketplaceProfileActions";
import { getAddressListAction } from "Core/modules/address/addressActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isPhoneNumber, nameValidator, emailValidator } from "Utils/validators";
import "react-datepicker/dist/react-datepicker.css";
import DivColumn from "CommonComponents/divColumn";

class EditMarketplaceProfile extends Component {
  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  onSubmit = (form) => {
    const {
      editMarketplaceProfileAction,
      navigateTo,
      showSuccessFlashMessage,
    } = this.props;
    editMarketplaceProfileAction({
      shop_name: form.shopName,
      contact_number: form.contactNumber,
      shop_email: form.shopEmail,
      area: form.area,
      block_number: form.blockNumber,
      house_number: form.houseNumber,
      street_number: form.streetNumber,
      avenue: form.avenue,
      landmark: form.landmark,
      address_type: form.addressType,
      city: form.city,
    }).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        navigateTo("profile-details");
        showSuccessFlashMessage("Profile Updated");
      }
    });
  };

  componentDidMount() {
    // TODO: To add to check if reducer data is not available.
    // this.props.getProfileDetailsAction().then(({ payload }) => {
    //   if (payload.code === 200 || payload.code === 201) {
    //     // code here
    //   }
    // });
  }

  validate = (values) => {
    const errors = {};
    const validators = {
      shopName: nameValidator(values.shopName),
      contactNumber: isPhoneNumber(values.contactNumber),
      shopEmail: emailValidator(values.shopEmail),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onClickCancel = () => {
    this.onBackPress();
  };

  render() {
    const {
      marketplaceProfileReducer: { profile },
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title="Marketplace Profile details"
          onBackClick={this.onBackPress}
        />
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          initialValues={{
            shopName: profile.shop_name ? profile.shop_name : "",
            contactNumber: profile.contact_number ? profile.contact_number : "",
            shopEmail: profile.shop_email ? profile.shop_email : "",
            area: profile.area ? profile.area : "",
            blockNumber: profile.block_number ? profile.block_number : "",
            houseNumber: profile.house_number ? profile.house_number : "",
            streetNumber: profile.street_number ? profile.street_number : "",
            avenue: profile.avenue ? profile.avenue : "",
            landmark: profile.landmark ? profile.landmark : "",
            addressType: profile.address_type ? profile.address_type : "",
            city: profile.city ? profile.city : "",
          }}
          render={({
            handleSubmit,
            form: {
              mutators: { mutateValue },
            },
            submitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <DivColumn className={styles.form_container}>
                <Field name="shopName">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Shop Name"
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="contactNumber">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Contact Number"
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="shopEmail">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Shop Email Address"
                      className={styles.input_text}
                    />
                  )}
                </Field>
              </DivColumn>
              <NavHeader title="Address details" />

              <DivColumn className={styles.form_container}>
                <Field name="area">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Area*"
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="blockNumber">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Block Number*"
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="houseNumber">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="House Number*"
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="streetNumber">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Street Number*"
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="avenue">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Avenue"
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="landmark">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Landmark"
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="addressType">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Home/Office*"
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="city">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="City"
                      className={styles.input_text}
                    />
                  )}
                </Field>

                {/* <InitialPageLoader initialPageApi={getAddressListAction}>
                <DivColumn>
                  {map(addressList, (address, index) => {
                    return (
                      <AddressItemComponent
                        address={address}
                        onClickEdit={this.handleEdit}
                        onClickRemove={this.handleRemove}
                        isSelected={address.id === marketplaceAddress.id}
                        onClickItem={() => selectMarketplaceAddress(address)}
                      />
                    );
                  })}
                </DivColumn>
              </InitialPageLoader> */}

                <DivRow className={styles.form_button_container}>
                  <SecondaryCapsuleButton onClick={this.onClickCancel}>
                    Cancel
                  </SecondaryCapsuleButton>
                  <CapsuleButton type="submit" disabled={submitting}>
                    Save Details
                  </CapsuleButton>
                </DivRow>
              </DivColumn>
            </form>
          )}
        />
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    marketplaceProfileReducer: state.marketplaceProfileReducer,
    addressReducer: state.addressReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getMarketplaceProfileAction: bindActionCreators(
      getMarketplaceProfileAction,
      dispatch
    ),
    getAddressListAction: bindActionCreators(getAddressListAction, dispatch),
    selectMarketplaceAddress: bindActionCreators(
      selectMarketplaceAddress,
      dispatch
    ),
    editMarketplaceProfileAction: bindActionCreators(
      editMarketplaceProfileAction,
      dispatch
    ),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(EditMarketplaceProfile));
