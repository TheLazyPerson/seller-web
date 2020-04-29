import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DivRow from "CommonComponents/divRow";
import styles from "./bank_details.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import InputCheckbox from "CommonComponents/InputCheckbox";
import { Form, Field } from "react-final-form";
// import { postSignupAction } from "Core/modules/signup/actions";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import navigatorHoc from "Hoc/navigatorHoc";
import { store } from "react-notifications-component";
import CustomNotification from "CommonComponents/customNotification";
// import {
//   nameValidator,
//   emailValidator,
//   passwordValidator,
//   isEmptyValidator
// } from "Utils/validators";
import translatorHoc from "Hoc/translatorHoc";

class BankDetails extends Component {
  onSubmit = form => {
    // const {
    //   postSignupAction,
    //   navigateTo,
    //   showSuccessFlashMessage
    // } = this.props;

    // postSignupAction({
    //   acount_holder: form.acount_holder,
    //   bank_name: form.bank_name,
    //   iban: form.iban
    // }).then(({ payload }) => {
    //   if (payload.code == 200 || payload.code == 201) {
    //     navigateTo("signin");
    //     showSuccessFlashMessage("Signed up successfuly");
    //   }
    // });

    store.addNotification({
      content: CustomNotification, // 👈
      container: "bottom-right",
      insert: "top",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000
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
            {translate("bank_detail_page.page_title")}
          </div>
          <Form
            onSubmit={this.onSubmit}
            // validate={this.validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <Field name="acount_holder">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate("bank_detail_page.acount_holder")}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="bank_name">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate("bank_detail_page.bank_name")}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="iban">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      type="text"
                      {...input}
                      placeholder={translate("bank_detail_page.iban")}
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <input
                  type="submit"
                  value={translate("bank_detail_page.create")}
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
)(translatorHoc(navigatorHoc(BankDetails)));
