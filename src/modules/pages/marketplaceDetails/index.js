import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./marketplace_details.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import { Form, Field } from "react-final-form";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import navigatorHoc from "Hoc/navigatorHoc";
import translatorHoc from "Hoc/translatorHoc";
import {
  isEmptyValidator,
  isPhoneNumber,
  emailValidator,
} from "Utils/validators";

class MarketplaceDetail extends Component {
  onSubmit = (form) => {
    const updatedPostData = {
      marketplace_profile: {
        shop_name: form.shop_name,
        shop_email_address: form.shop_email,
        shop_contact_number: form.contact_number,
      },
    };

    this.props.profileUpdate(updatedPostData);
  };

  validate = (values) => {
    const errors = {};
    const validators = {
      shop_name: isEmptyValidator(values.shop_name),
      shop_email: emailValidator(values.shop_email),
      contact_number: isPhoneNumber(values.contact_number),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  render() {
    const { translate } = this.props;

    return (
      <DivColumn
        verticalCenter
        horizontalCenter
        className={styles.page_container}
      >
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit, submitting }) => (
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <Field name="shop_name">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate(
                      "marketplace_profile_details.shop_name"
                    )}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <Field name="contact_number">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="text"
                    {...input}
                    placeholder={translate(
                      "marketplace_profile_details.contact_number"
                    )}
                    className={styles.input_text}
                  />
                )}
              </Field>

              <Field name="shop_email">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    type="email"
                    {...input}
                    placeholder={translate(
                      "marketplace_profile_details.email_address"
                    )}
                    className={styles.input_text}
                  />
                )}
              </Field>
              <input
                type="submit"
                value={translate("marketplace_profile_details.create")}
                className={styles.input_submit}
                disabled={submitting}
              />
            </form>
          )}
        />
      </DivColumn>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signupReducer: state.signupReducer,
    signInReducer: state.signInReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    // postSignupAction: bindActionCreators(postSignupAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(translatorHoc(MarketplaceDetail)));
