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
  selectMarketplaceAddress
} from "Core/modules/marketplaceprofile/marketplaceProfileActions";
import { getAddressListAction } from "Core/modules/address/addressActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  isPhoneNumber,
  nameValidator,
  isEmptyValidator,
  emailValidator
} from "Utils/validators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import DivColumn from "CommonComponents/divColumn";
import AddressItemComponent from "CommonComponents/addressItemComponent";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import map from "lodash/map";
import InitialPageLoader from "CommonContainers/initialPageLoader";

class EditMarketplaceProfile extends Component {
  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  onSubmit = form => {
    const {
      editMarketplaceProfileAction,
      navigateTo,
      showSuccessFlashMessage,
      marketplaceProfileReducer: { marketplaceAddress }
    } = this.props;
    editMarketplaceProfileAction({
      shop_name: form.shopName,
      contact_number: form.contactNumber,
      shop_email: form.shopEmail,
      shop_address_id: marketplaceAddress.id
    }).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        navigateTo("marketplace");
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

  validate = values => {
    const errors = {};
    const validators = {
      shopName: nameValidator(values.shopName),
      contactNumber: isPhoneNumber(values.contactNumber),
      shopEmail: emailValidator(values.shopEmail)
    };

    Object.keys(validators).forEach(key => {
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
      addressReducer: { addressList }
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
            shopEmail: profile.shop_email ? profile.shop_email : ""
          }}
          render={({
            handleSubmit,
            form: {
              mutators: { mutateValue }
            },
            submitting,
            pristine,
            values
          }) => (
            <form className={styles.form_container} onSubmit={handleSubmit}>
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

              <HorizontalBorder />

              <InitialPageLoader initialPageApi={getAddressListAction}>
                <DivColumn>
                  {map(addressList, (address, index) => {
                    return (
                      <AddressItemComponent
                        address={address}
                        onClickEdit={this.handleEdit}
                        onClickRemove={this.handleRemove}
                        isSelected={address.id == marketplaceAddress.id}
                        onClickItem={() => selectMarketplaceAddress(address)}
                      />
                    );
                  })}
                </DivColumn>
              </InitialPageLoader>

              <DivRow className={styles.form_button_container}>
                <SecondaryCapsuleButton onClick={this.onClickCancel}>
                  Cancel
                </SecondaryCapsuleButton>
                <CapsuleButton type="submit" disabled={submitting}>
                  Save Details
                </CapsuleButton>
              </DivRow>
            </form>
          )}
        />
      </SectionedContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    marketplaceProfileReducer: state.marketplaceProfileReducer,
    addressReducer: state.addressReducer
  };
};

const mapDispathToProps = dispatch => {
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
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(EditMarketplaceProfile));
