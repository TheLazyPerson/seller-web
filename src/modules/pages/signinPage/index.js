import React, { Component, Fragment } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./signin_page.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import InputCheckbox from "CommonComponents/InputCheckbox";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { postSigninAction } from "Core/modules/signin/signinActions";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import translatorHoc from "Hoc/translatorHoc";
import { emailValidator, isEmptyValidator } from "Utils/validators";
import { Form, Field } from "react-final-form";

class SignInPage extends Component {
  onSubmit = (form) => {
    const { postSigninAction, navigateTo } = this.props;

    postSigninAction({
      email: form.userName, // "buisness@gmail.com",
      password: form.password,
    }).then(({ payload }) => {
      const { data, code } = payload;
      if (code === 200 || code === 201) {
        CookieService.set(USER_DATA_COOKIE, data);
        if (data.is_registeration_complete === 0) {
          navigateTo("customer-onboard");
        } else {
          navigateTo("home");
        }
      }
    });
  };

  validate = (values) => {
    const errors = {};
    const validators = {
      userName: emailValidator(values.userName),
      password: isEmptyValidator(values.password),
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
            {translate("signin_page.page_title")}
          </div>
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <Fragment>
                  <Field name="userName">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder={translate("signin_page.username")}
                        className={styles.input_text}
                      />
                    )}
                  </Field>

                  <Field name="password">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder={translate("signin_page.password")}
                        className={styles.input_text}
                        type="password"
                      />
                    )}
                  </Field>

                  {/* <Field name="remeberMe">
                    {({ input, meta }) => (
                      <InputCheckbox
                        meta={meta}
                        {...input}
                        text={translate("signin_page.remember_me")}
                      />
                    )}
                  </Field> */}
                </Fragment>
                <input
                  type="submit"
                  value={translate("signin_page.sign_in_button")}
                  className={styles.input_submit}
                  disabled={submitting}
                />
              </form>
            )}
          />
          <a className={styles.hyper_link} href="/forgot-password">
            {translate("signin_page.forget_password")}
          </a>
          <div className={styles.create_account_container}>
            <span className={styles.new_description_text}>
              {translate("signin_page.new")}&nbsp;
            </span>
            <a className={styles.hyper_link} href="/customer-onboard">
              {translate("signin_page.create")}
            </a>
          </div>
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signInReducer: state.signInReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    postSigninAction: bindActionCreators(postSigninAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(SignInPage)));
