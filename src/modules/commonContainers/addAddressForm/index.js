import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import styles from "./add_address_form.module.scss";
import { Form, Field } from "react-final-form";
import CapsuleButton from "CommonComponents/capsuleButton";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";
import InputTextComponent from "CommonComponents/InputTextComponent";
import InputCheckbox from "CommonComponents/InputCheckbox";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import {
  isPhoneNumber,
  nameValidator,
  isEmptyValidator,
} from "Utils/validators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import {
  createAddressAction,
  editAddressAction,
} from "Core/modules/address/addressActions";
import find from "lodash/find";
import Select from "react-select";
import map from "lodash/map";

class AddAddressForm extends Component {
  validate = (values) => {
    const errors = {};
    const validators = {
      firstName: nameValidator(values.firstName),
      lastName: nameValidator(values.lastName),
      mobileNumber: isPhoneNumber(values.mobileNumber),
      address1: isEmptyValidator(values.address1),
      address2: isEmptyValidator(values.address2),
      city: isEmptyValidator(values.city),
      state: isEmptyValidator(values.state),
      country: isEmptyValidator(values.country),
      country_code: isEmptyValidator(values.country_code),
      pincode: isEmptyValidator(values.pincode),
      name: isEmptyValidator(values.name),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onSubmit = (form) => {
    const {
      createAddressAction,
      showSuccessFlashMessage,
      onSubmitComplete,
      addressId,
      editAddressAction,
    } = this.props;

    const formData = {
      first_name: form.firstName,
      last_name: form.lastName,
      phone_number: form.mobileNumber,
      address1: form.address1,
      address2: form.address2,
      postcode: form.pincode,
      city: form.city,
      state: form.state,
      country: form.country,
      country_code: form.country_code,
      default_address: 1,
      name: form.name,
    };

    if (addressId) {
      editAddressAction(addressId, formData).then(({ payload }) => {
        if (payload.code === 200 || payload.code === 201) {
          onSubmitComplete();
          showSuccessFlashMessage("Address Edited");
        }
      });
    } else {
      createAddressAction(formData).then(({ payload }) => {
        if (payload.code === 200 || payload.code === 201) {
          onSubmitComplete();
          showSuccessFlashMessage("Address Added");
        }
      });
    }
  };

  getInitialValuesFromAddress = (address) => {
    return {
      firstName: address.first_name ? address.first_name : "",
      lastName: address.last_name ? address.last_name : "",
      mobileNumber: address.phone_number ? address.phone_number : "",
      name: address.name ? address.name : "",
      address1: address.address1 ? address.address1 : "",
      address2: address.address2 ? address.address2 : "",
      city: address.city ? address.city : "",
      state: address.state ? address.state : "",
      country: address.country ? address.country : "",
      country_code: address.country_code ? address.country_code : "",
      pincode: address.postcode ? address.postcode : "",
    };
  };

  formatSelectorData = (list) => {
    return map(list, (item) => ({ value: item.name, label: item.name }));
  };

  render() {
    const {
      onClickCancel,
      addressReducer: { addressList },
      addressId,
      basicReducer: { basicData },
    } = this.props;
    const editAddress = find(addressList, (address) => {
      return address.id === addressId;
    });
    const addressTypes = [
      {
        value: "home",
        label: "Home",
      },
      {
        value: "office",
        label: "Office",
      },
    ];
    const countries = this.formatSelectorData(basicData.countries);
    const states = this.formatSelectorData(basicData.states);
    const defaultCountry = find(countries, (country) => {
      return editAddress && country.value === editAddress.country;
    });
    const defaultState = find(states, (state) => {
      return editAddress && state.value === editAddress.state;
    });

    let defaultAddressType = null;

    if (editAddress && editAddress.name) {
      if (editAddress.name === "home") {
        defaultAddressType = addressTypes[0];
      } else {
        defaultAddressType = addressTypes[1];
      }
    }

    return (
      <DivColumn fillParent className={styles.page_container}>
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          initialValues={
            editAddress ? this.getInitialValuesFromAddress(editAddress) : null
          }
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <DivColumn className={styles.text_input_container}>
                <Field name="firstName">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="First Name"
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="lastName">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Last Name"
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="mobileNumber">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Mobile Number"
                      className={styles.input_text}
                    />
                  )}
                </Field>
              </DivColumn>

              <HorizontalBorder className={styles.address_divider} />

              <DivColumn className={styles.text_input_container}>
                <Field name="name">
                  {({ input, meta }) => (
                    <DivColumn className="input_select_container">
                      <Select
                        options={addressTypes}
                        onChange={(value) => {
                          input.onChange(value.value);
                        }}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Home/Office"
                        defaultValue={defaultAddressType}
                      />
                      {meta.error && meta.touched && (
                        <span className="error_text">{meta.error}</span>
                      )}
                    </DivColumn>
                  )}
                </Field>

                <Field name="address1">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Address Line 1"
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="address2">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Address Line 2"
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

                <Field name="state">
                  {({ input, meta }) => (
                    <DivColumn className="input_select_container">
                      <Select
                        options={states}
                        onChange={(value) => {
                          input.onChange(value.value);
                        }}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="State"
                        defaultValue={defaultState}
                      />
                      {meta.error && meta.touched && (
                        <span className="error_text">{meta.error}</span>
                      )}
                    </DivColumn>
                  )}
                </Field>

                <Field name="country">
                  {({ input, meta }) => (
                    <DivColumn className="input_select_container">
                      <Select
                        options={countries}
                        onChange={(value) => {
                          input.onChange(value.value);
                        }}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="County"
                        defaultValue={defaultCountry}
                      />
                      {meta.error && meta.touched && (
                        <span className="error_text">{meta.error}</span>
                      )}
                    </DivColumn>
                  )}
                </Field>

                {/* <Field name="country_code">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      disabled
                      placeholder="Country Code"
                      className={styles.input_text}
                    />
                  )}
                </Field> */}

                <Field name="pincode">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder="Pincode"
                      className={styles.input_text}
                    />
                  )}
                </Field>
              </DivColumn>

              <HorizontalBorder className={styles.button_divider} />
              <DivColumn
                verticalCenter
                horizontalCenter
                className={styles.checkbox_container}
              >
                <InputCheckbox
                  text="Make this my default address."
                  textStyle={styles.checkbox_text}
                />
              </DivColumn>
              <DivRow className={styles.form_button_container}>
                <SecondaryCapsuleButton onClick={onClickCancel}>
                  Cancel
                </SecondaryCapsuleButton>
                <CapsuleButton type="submit" disabled={submitting}>
                  Save Details
                </CapsuleButton>
              </DivRow>
            </form>
          )}
        />
      </DivColumn>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addressReducer: state.addressReducer,
    basicReducer: state.basicReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    createAddressAction: bindActionCreators(createAddressAction, dispatch),
    editAddressAction: bindActionCreators(editAddressAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(AddAddressForm);
