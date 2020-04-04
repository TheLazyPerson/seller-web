import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./reset_password.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  verifyPasswordTokenAction,
  resetPasswordAction
} from "Core/modules/resetpassword/resetPasswordActions";
import translatorHoc from "Hoc/translatorHoc";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import queryString from "query-string";
// import resetPasswordAction from "Core/modules/resetpassword";

class RestPassword extends Component {
  state = {
    password: "",
    confirm_passowrd: "",
    params: queryString.parse(this.props.location.search)
  };

  onSubmit = form => {
    form.preventDefault();
    const {
      resetPasswordAction,
      navigateTo,
      resetPasswordReducer: { tokenInformation }
    } = this.props;
    const { confirm_passowrd, password, email, token } = this.state;
    if (confirm_passowrd && password) {
      const formData = {
        email: tokenInformation.data["token-information"].email,
        password_confirmation: confirm_passowrd, // "buisness@gmail.com",
        password: password,
        token: tokenInformation.data["token-information"].token
      };

      resetPasswordAction(formData).then(response => {
        const { data, code } = response.payload;
        if (code === 200 || code === 201) {
          navigateTo("home");
        }
      });
    }
  };

  render() {
    const { confirm_passowrd, password } = this.state;
    const {
      translate,
      verifyPasswordTokenAction,
      resetPasswordReducer: { tokenInformation }
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
              <form className={styles.form_container} onSubmit={this.onSubmit}>
                <InputTextComponent
                  type="password"
                  placeholder={translate("update_password_page.password")}
                  className={styles.input_text}
                  value={password}
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                />
                <InputTextComponent
                  type="password"
                  placeholder={translate(
                    "update_password_page.confirmed_password"
                  )}
                  className={styles.input_text}
                  value={confirm_passowrd}
                  onChange={event =>
                    this.setState({ confirm_passowrd: event.target.value })
                  }
                />

                <input
                  type="submit"
                  value={translate(
                    "update_password_page.reset_password_button"
                  )}
                  className={styles.input_submit}
                />
              </form>
            )}
          </DivColumn>
        </InitialPageLoader>
      </FullWidthContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    resetPasswordReducer: state.resetPasswordReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    verifyPasswordTokenAction: bindActionCreators(
      verifyPasswordTokenAction,
      dispatch
    ),
    resetPasswordAction: bindActionCreators(resetPasswordAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(RestPassword)));
