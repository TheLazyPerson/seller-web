import React, { Component, Fragment } from "react";
import DivColumn from "CommonComponents/divColumn";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./signup_page.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import { Form, Field } from "react-final-form";
import { postSignupAction } from "Core/modules/signup/signupActions"; //src\seller-core\modules\signup\signupActions.js
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import navigatorHoc from "Hoc/navigatorHoc";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  isEmptyValidator,
} from "Utils/validators";
import translatorHoc from "Hoc/translatorHoc";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import { getPlanListAction } from "Core/modules/subscription/subscriptionActions";
import Pricing from "../Pricing";

class SignUpPage extends Component {
  state = {
    showSubscription: false,
  };

  onSubmit = (form) => {
    const postData = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirmPassword,
    };

    this.props.onSignUp(postData);
  };

  validate = (values) => {
    const errors = {};
    const validators = {
      firstName: nameValidator(values.firstName),
      lastName: nameValidator(values.lastName),
      email: emailValidator(values.email),
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
      subscriptionReducer: { subscriptionPlanList },
      getPlanListAction,
    } = this.props;
    const { showSubscription } = this.state;

    return (
      <DivColumn
        verticalCenter
        horizontalCenter
        className={styles.page_container}
      >
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={styles.form_container} onSubmit={handleSubmit}>
              {showSubscription ? (
                <InitialPageLoader initialPageApi={getPlanListAction}>
                  <Pricing subscriptionPlanList={subscriptionPlanList} />
                </InitialPageLoader>
              ) : (
                <Fragment>
                  {/* <DivRow className={styles.name_container}> */}
                  <Field name="firstName">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder={translate("signup_page.firstname")}
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                  <Field name="lastName">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder={translate("signup_page.lastname")}
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                  {/* </DivRow> */}
                  <Field name="email">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder={translate("signup_page.email")}
                        className={styles.input_text}
                      />
                    )}
                  </Field>

                  <Field name="password">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        type="password"
                        {...input}
                        placeholder={translate("signup_page.password")}
                        className={styles.input_text}
                      />
                    )}
                  </Field>

                  <Field name="confirmPassword">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        type="password"
                        {...input}
                        placeholder={translate("signup_page.confirm_password")}
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                </Fragment>
              )}
              <input
                type="submit"
                value={translate("signup_page.create")}
                className={styles.input_submit}
                disabled={submitting}
              />
            </form>
          )}
        />

        <div className={styles.create_account_container}>
          <span className={styles.new_description_text}>
            {translate("signup_page.have_account")}&nbsp;
          </span>
          <a className={styles.hyper_link} href="/signin">
            {translate("signup_page.sign_in")}
          </a>
        </div>
      </DivColumn>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signupReducer: state.signupReducer,
    signInReducer: state.signInReducer,
    subscriptionReducer: state.subscriptionReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    postSignupAction: bindActionCreators(postSignupAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
    getPlanListAction: bindActionCreators(getPlanListAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(SignUpPage)));
