import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./forget_password.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createPasswordTokenAction } from "Core/modules/resetpassword/resetPasswordActions";
import translatorHoc from "Hoc/translatorHoc";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import { emailValidator } from "Utils/validators";
import { Form, Field } from "react-final-form";

class ForgotPassword extends Component {
  onSubmit = (form) => {
    const {
      createPasswordTokenAction,
      navigateTo,
      showSuccessFlashMessage,
    } = this.props;

    createPasswordTokenAction({
      email: form.userName,
    }).then(({ payload }) => {
      const { code, message } = payload;
      if (code === 200) {
        showSuccessFlashMessage(message);

        // TODO: redirect to new page saying that we have sent a reset link on your email
        navigateTo("signin");
      } else if (code === 404) {
        showSuccessFlashMessage("User Doesn't Exists ");
      }
    });
  };

  validate = (values) => {
    const errors = {};
    const validators = {
      userName: emailValidator(values.userName),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

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
            {translate("reset_password_page.page_title")}
          </div>
          <div>
            <div className={styles.signin_subtitle_text}>
              {translate("reset_password_page.sub_title")}&nbsp;
            </div>
          </div>
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <Field name="userName">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate("reset_password_page.username")}
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <input
                  type="submit"
                  value={translate("reset_password_page.reset_password_button")}
                  className={styles.input_submit}
                  disabled={submitting}
                />
              </form>
            )}
          />

          <div className={styles.create_account_container}>
            <span className={styles.new_description_text}>
              {translate("reset_password_page.new")}&nbsp;
            </span>
            <a className={styles.hyper_link} href="/signin">
              {translate("reset_password_page.create")}
            </a>
          </div>
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    createPasswordTokenAction: state.createPasswordTokenAction,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    createPasswordTokenAction: bindActionCreators(
      createPasswordTokenAction,
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
)(translatorHoc(navigatorHoc(ForgotPassword)));
