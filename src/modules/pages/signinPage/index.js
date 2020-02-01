import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./signin_page.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import InputCheckbox from "CommonComponents/InputCheckbox";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { postSigninAction } from "Core/modules/signin/actions/signinActions";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import translatorHoc from 'Hoc/translatorHoc';

class SignInPage extends Component {
  state = {
    userName: "",
    password: ""
  };

  onSubmit = form => {
    form.preventDefault();
    const { postSigninAction, navigateTo } = this.props;
    const { userName, password } = this.state;

    if (userName && password) {
      postSigninAction({
        email: userName, // "buisness@gmail.com",
        password
      }).then(response => {
        const { data, code } = response.payload;
        if (code === 200 || code === 201) {
          CookieService.set(USER_DATA_COOKIE, data);
          navigateTo("");
        }
      });
    }
  };

  render() {
    const { userName, password } = this.state;
    const { translate } = this.props;

    return (
      <FullWidthContainer>
        <DivColumn
          verticalCenter
          horizontalCenter
          className={styles.page_container}
        >
          <div className={styles.signin_title_text}>{translate('signin_page.page_title')}</div>
          <form className={styles.form_container} onSubmit={this.onSubmit}>
            <InputTextComponent
              placeholder={translate('signin_page.username')}
              className={styles.input_text}
              value={userName}
              onChange={event =>
                this.setState({ userName: event.target.value })
              }
            />

            <InputTextComponent
              placeholder={translate('signin_page.password')}
              className={styles.input_text}
              type="password"
              value={password}
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />

            <InputCheckbox text={translate('signin_page.remember_me')} />
            <input
              type="submit"
              value={translate('signin_page.sign_in_button')}
              className={styles.input_submit}
            />
          </form>
          {/* <a className={styles.hyper_link} href="/forgot-password">
            Forgot password
          </a> */}
          <div className={styles.create_account_container}>
            <span className={styles.new_description_text}>
            {translate('signin_page.new')}&nbsp;
            </span>
            <a className={styles.hyper_link} href="/signup">
            {translate('signin_page.create')}
            </a>
          </div>
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    signInReducer: state.signInReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    postSigninAction: bindActionCreators(postSigninAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(translatorHoc(navigatorHoc(SignInPage)));
