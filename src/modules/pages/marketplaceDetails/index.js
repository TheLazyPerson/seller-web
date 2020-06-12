import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DivRow from "CommonComponents/divRow";
import styles from "./marketplace_details.module.scss";
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
  isEmptyValidator,
} from "Utils/validators";
import translatorHoc from "Hoc/translatorHoc";

class MarketplaceDetail extends Component {
  onSubmit = (form) => {
    const {
      postSignupAction,
      navigateTo,
      showSuccessFlashMessage,
    } = this.props;

    postSignupAction({
      shopp_name: form.shopp_name,
      shop_contact_number: form.shop_contact_number,
      shop_email_addres: form.shop_email_addres,
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
            {translate("edit_marketplace_detail_page.page_title")}
          </div>
          <Form
            onSubmit={this.onSubmit}
            // validate={this.validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <Field name="shopp_name">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.shop_name"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="shop_contact_number">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.shop_contact_number"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="shop_email_addres">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="email"
                      {...input}
                      placeholder={translate(
                        "edit_marketplace_detail_page.shop_email_addres"
                      )}
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <input
                  type="submit"
                  value={translate("edit_marketplace_detail_page.create")}
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
