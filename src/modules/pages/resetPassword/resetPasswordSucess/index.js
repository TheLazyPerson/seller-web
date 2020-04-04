import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./reset_password_sucess.module.scss";
// import InputTextComponent from "CommonComponents/InputTextComponent";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//   verifyPasswordTokenAction,
//   resetPasswordAction
// } from "Core/modules/resetpassword/resetPasswordActions";
import translatorHoc from "Hoc/translatorHoc";
// import InitialPageLoader from "CommonContainers/initialPageLoader";
// import resetPasswordAction from "Core/modules/resetpassword";

class RestPasswordSuccess extends Component {
  state = {
    // password: "",
    // confirm_passowrd: ""
  };

  render() {
    // const { confirm_passowrd, password } = this.state;
    const { translate } = this.props;
    return (
      <FullWidthContainer>
        <DivColumn
          verticalCenter
          horizontalCenter
          className={styles.page_container}
        >
          <div className={styles.circle}></div>
          <div className={styles.signin_title_text}>
            Password Change Successful!
          </div>
          <input
            type="submit"
            value={translate("signin_page.sign_in_button")}
            className={styles.input_submit}
          />
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     resetPasswordReducer: state.resetPasswordReducer
//   };
// };

// const mapDispathToProps = dispatch => {
//   return {
//     verifyPasswordTokenAction: bindActionCreators(
//       verifyPasswordTokenAction,
//       dispatch
//     ),
//     resetPasswordAction: bindActionCreators(resetPasswordAction, dispatch)
//   };
// };

export default connect()(translatorHoc(navigatorHoc(RestPasswordSuccess)));
//   mapStateToProps,
//   mapDispathToProps
