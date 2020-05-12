import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./reset_password_sucess.module.scss";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import Checked from "Icons/checked.svg";

import translatorHoc from "Hoc/translatorHoc";

class ResetPasswordSuccess extends Component {
  render() {
    const { translate } = this.props;
    return (
      <FullWidthContainer>
        <DivColumn
          verticalCenter
          horizontalCenter
          className={styles.page_container}
        >
          <div className={styles.circle}>
            <img className={styles.image} src={Checked} />
          </div>
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

export default connect()(translatorHoc(navigatorHoc(ResetPasswordSuccess)));
