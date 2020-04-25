import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DivRow from "CommonComponents/divRow";
import styles from "./location_details.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import InputCheckbox from "CommonComponents/InputCheckbox";
import { Form, Field } from "react-final-form";
// import { postSignupAction } from "Core/modules/signup/actions";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import navigatorHoc from "Hoc/navigatorHoc";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  isEmptyValidator
} from "Utils/validators";
import translatorHoc from "Hoc/translatorHoc";

class LocationDetails extends Component {
  onSubmit = form => {
    const {
      postSignupAction,
      navigateTo,
      showSuccessFlashMessage
    } = this.props;

    postSignupAction({
      area: form.area,
      block_number: form.block_number,
      house_number: form.house_number,
      street_number: form.street_number,
      avenue: form.avenue,
      landmark: form.landmark,
      home_office: form.home_office,
      city: form.city
    }).then(({ payload }) => {
      if (payload.code == 200 || payload.code == 201) {
        navigateTo("signin");
        showSuccessFlashMessage("Signed up successfuly");
      }
    });
  };

  // validate = (values) => {
  //   const errors = {};
  //   const validators = {
  //     shopp_name: emailValidator(values.shopp_name),
  //     password: isEmptyValidator(values.password),
  //     confirmPassword: passwordValidator(
  //       values.password,
  //       values.confirmPassword
  //     ),
  //   };

  //   Object.keys(validators).forEach((key) => {
  //     if (!validators[key].result) errors[key] = validators[key].error;
  //   });

  //   return errors;
  // };

  render() {
    const { translate } = this.props;

    return (
      <FullWidthContainer>
        <DivColumn
          verticalCenter
          horizontalCenter
          className={styles.page_container}
        >
          <div className={styles.signin_title_text}>
            {translate("location_detail_page.page_title")}
          </div>
          <Form
            onSubmit={this.onSubmit}
            // validate={this.validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <Field name="area">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate("location_detail_page.area")}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="block_number">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate(
                        "location_detail_page.block_number"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="house_number">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate(
                        "location_detail_page.house_number"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="street_number">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate(
                        "location_detail_page.street_number"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="avenue">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate("location_detail_page.avenue")}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="landmark">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate("location_detail_page.landmark")}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="home_office">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate(
                        "location_detail_page.home_office"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="city">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate("location_detail_page.city")}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <input
                  type="submit"
                  value={translate("location_detail_page.create")}
                  className={styles.input_submit}
                  disabled={submitting}
                />
              </form>
            )}
          />
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    signupReducer: state.signupReducer,
    signInReducer: state.signInReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    // postSignupAction: bindActionCreators(postSignupAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(LocationDetails)));
