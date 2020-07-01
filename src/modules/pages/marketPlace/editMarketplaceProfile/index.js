import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivRow from "CommonComponents/divRow";
import DivColumn from "CommonComponents/divColumn";
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
import translatorHoc from "Hoc/translatorHoc";

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
      marketplaceProfileReducer: { marketplaceAddress },
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
      getAddressListAction,
      selectMarketplaceAddress,
      marketplaceProfileReducer: { profile, marketplaceAddress },
      addressReducer: { addressList },
      translate,
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title={translate("edit_marketplace_detail_page.page_title")}
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
            pristine,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <DivColumn className={styles.form_container}>
                <Field name="shopName">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.shop_name"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="contactNumber">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.shop_contact_number"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="shopEmail">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.shop_email_addres"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>
              </DivColumn>
              <NavHeader
                title={translate(
                  "edit_marketplace_detail_page.address_details"
                )}
              />

              <DivColumn className={styles.form_container}>
                <Field name="area">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.area"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="blockNumber">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.block_number"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="houseNumber">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.house_number"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="streetNumber">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.street_number"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="avenue">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.avenue"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="landmark">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.landmark"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="addressType">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.home"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="city">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.city"
                      )}
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
                    {translate("edit_marketplace_detail_page.cancle")}
                  </SecondaryCapsuleButton>
                  <CapsuleButton type="submit" disabled={submitting}>
                    {translate("edit_marketplace_detail_page.save_details")}
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
)(navigatorHoc(translatorHoc(EditMarketplaceProfile)));
