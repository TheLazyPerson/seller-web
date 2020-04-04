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
class ForgotPassword extends Component {
  state = {
    userName: ""
  };

  onSubmit = form => {
    form.preventDefault();
    const {
      createPasswordTokenAction,
      navigateTo,
      showSuccessFlashMessage
    } = this.props;
    const { userName } = this.state;

    if (userName) {
      createPasswordTokenAction({
        email: userName // "buisness@gmail.com",
      }).then(response => {
        if (response.payload.code == 200) {
          showSuccessFlashMessage(response.payload.message);
        } else if (response.payload.code == 404) {
          showSuccessFlashMessage("User Doesn't Exists ");
        }
      });
    }
  };

  render() {
    const { userName } = this.state;
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
          <form className={styles.form_container} onSubmit={this.onSubmit}>
            <InputTextComponent
              placeholder={translate("reset_password_page.username")}
              className={styles.input_text}
              value={userName}
              onChange={event =>
                this.setState({ userName: event.target.value })
              }
            />
            <input
              type="submit"
              value={translate("reset_password_page.reset_password_button")}
              className={styles.input_submit}
            />
          </form>
          {/* <a className={styles.hyper_link} href="/forgot-password">
            Forgot password
          </a> */}
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

const mapStateToProps = state => {
  return {
    createPasswordTokenAction: state.createPasswordTokenAction
  };
};

const mapDispathToProps = dispatch => {
  return {
    createPasswordTokenAction: bindActionCreators(
      createPasswordTokenAction,
      dispatch
    ),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(ForgotPassword)));
