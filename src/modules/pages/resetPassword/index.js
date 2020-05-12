import React, { Component, Fragment } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./reset_password.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  verifyPasswordTokenAction,
  resetPasswordAction,
} from "Core/modules/resetpassword/resetPasswordActions";
import translatorHoc from "Hoc/translatorHoc";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import queryString from "query-string";
import { Form, Field } from "react-final-form";
import { isEmptyValidator, passwordValidator } from "Utils/validators";

// import resetPasswordAction from "Core/modules/resetpassword";

class ResetPassword extends Component {
  state = {
    params: queryString.parse(this.props.location.search),
  };

  onSubmit = (form) => {
    const {
      resetPasswordAction,
      navigateTo,
      resetPasswordReducer: { tokenInformation },
    } = this.props;

    resetPasswordAction({
      email: tokenInformation.data["token-information"].email,
      password_confirmation: form.confirmPassword, // "buisness@gmail.com",
      password: form.password,
      token: tokenInformation.data["token-information"].token,
    }).then(({ payload }) => {
      const { data, code } = payload;
      if (code === 200 || code === 201) {
        navigateTo("reset-password-sucess");
      } else if (code === 400 || code === 404) {
        // navigateTo("reset-password-sucess");
      }
    });
  };

  validate = (values) => {
    const errors = {};
    const validators = {
      password: isEmptyValidator(values.password),
      confirmPassword: passwordValidator(
        values.password,
        values.confirmPassword
      ),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  render() {
    const {
      translate,
      verifyPasswordTokenAction,
      resetPasswordReducer: { tokenInformation },
    } = this.props;
    return (
      <FullWidthContainer>
        <InitialPageLoader
          initialPageApi={() =>
            verifyPasswordTokenAction(this.state.params.token)
          }
        >
          <DivColumn
            verticalCenter
            horizontalCenter
            className={styles.page_container}
          >
            <div className={styles.signin_title_text}>
              {translate("update_password_page.page_title")}
            </div>
            {tokenInformation.code == 200 && (
              <div>
                <div className={styles.signin_subtitle_text}>
                  {translate("update_password_page.sub_title")}&nbsp;
                </div>
              </div>
            )}
            {tokenInformation.code == 400 ||
              (tokenInformation.code == 404 && (
                <div>
                  <div className={styles.signin_subtitle_text}>
                    {translate("update_password_page.sub_title1")}&nbsp;
                  </div>
                </div>
              ))}

            {tokenInformation.code == 200 && (
              <Form
                onSubmit={this.onSubmit}
                validate={this.validate}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  values,
                }) => (
                  <form
                    className={styles.form_container}
                    onSubmit={handleSubmit}
                  >
                    <Field name="password">
                      {({ input, meta }) => (
                        <InputTextComponent
                          meta={meta}
                          {...input}
                          type="password"
                          placeholder={translate(
                            "update_password_page.password"
                          )}
                          className={styles.input_text}
                        />
                      )}
                    </Field>
                    <Field name="confirmPassword">
                      {({ input, meta }) => (
                        <InputTextComponent
                          meta={meta}
                          {...input}
                          type="password"
                          placeholder={translate(
                            "update_password_page.confirmed_password"
                          )}
                          className={styles.input_text}
                        />
                      )}
                    </Field>

                    <input
                      type="submit"
                      value={translate(
                        "update_password_page.reset_password_button"
                      )}
                      disabled={submitting}
                      className={styles.input_submit}
                    />
                  </form>
                )}
              />
            )}
          </DivColumn>
        </InitialPageLoader>
      </FullWidthContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    resetPasswordReducer: state.resetPasswordReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    verifyPasswordTokenAction: bindActionCreators(
      verifyPasswordTokenAction,
      dispatch
    ),
    resetPasswordAction: bindActionCreators(resetPasswordAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(ResetPassword)));
