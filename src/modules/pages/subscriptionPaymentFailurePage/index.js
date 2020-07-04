import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./payment_failure.module.scss";
import CapsuleButton from "CommonComponents/capsuleButton";
import navigatorHoc from "Hoc/navigatorHoc";
import { SignalCellularNull } from "material-ui-icons";
import translatorHoc from "Hoc/translatorHoc";
import { connect } from "react-redux";

class SubscriptionPaymentFailurePage extends Component {
  render() {
    const { translate, isRTL } = this.props;
    return (
      <FullWidthContainer>
        <DivColumn
          verticalCenter
          horizontalCenter
          className={` ${styles.page_container} ${isRTL ? styles.rtl : ""}`}
        >
          <div className={styles.title}>
            {translate("exhibition_overview.subscription_success")}
          </div>
          <div className={styles.description}>
            {translate("exhibition_overview.description")}
          </div>
          <CapsuleButton>
            {translate("exhibition_overview.retry")}
          </CapsuleButton>
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isRTL: state.languageReducer.isRTL,
  };
};

export default connect(
  mapStateToProps,
  null
)(navigatorHoc(translatorHoc(SubscriptionPaymentFailurePage)));
