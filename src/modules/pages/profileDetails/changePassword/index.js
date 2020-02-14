import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./change_password.module.scss";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";
import InputTextComponent from "CommonComponents/InputTextComponent";
import navigatorHoc from "Hoc/navigatorHoc";
import { passwordValidator, isEmptyValidator } from "Utils/validators";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changePasswordAction } from "Core/modules/changepassword/changePasswordActions";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";

class ChangePassword extends Component {
  validate = values => {
    const errors = {};
    const validators = {
      oldPassword: isEmptyValidator(values.oldPassword),
      newPassword: isEmptyValidator(values.newPassword),
      confirmPassword: passwordValidator(
        values.newPassword,
        values.confirmPassword
      )
    };

    Object.keys(validators).forEach(key => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onSubmit = form => {
    const {
      changePasswordAction,
      navigateTo,
      showSuccessFlashMessage
    } = this.props;

    changePasswordAction({
      old_password: form.oldPassword,
      new_password: form.newPassword,
      new_password_confirmation: form.confirmPassword
    }).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        navigateTo("profile");
        showSuccessFlashMessage("Password Changed successfuly");
      }
    });
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  onClickCancel = () => {
    this.onBackPress();
  };

  render() {
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader title="Change password" onBackClick={this.onBackPress} />
        <Form
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <Field name="oldPassword">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    {...input}
                    type="password"
                    placeholder="Old Password"
                    className={styles.input_text}
                  />
                )}
              </Field>
              <Field name="newPassword">
                {({ input, meta }) => (
                  <InputTextComponent
                    meta={meta}
                    {...input}
                    type="password"
                    placeholder="New Password"
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
                    placeholder="Confirm Password"
                    className={styles.input_text}
                  />
                )}
              </Field>

              <DivRow className={styles.form_button_container}>
                <SecondaryCapsuleButton onClick={this.onClickCancel}>
                  Cancel
                </SecondaryCapsuleButton>
                <CapsuleButton type="submit" disabled={submitting}>
                  Confirm
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
    changePasswordReducer: state.changePasswordReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    changePasswordAction: bindActionCreators(changePasswordAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(ChangePassword));
