import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./payment_failure.module.scss";
import CapsuleButton from "CommonComponents/capsuleButton";
import navigatorHoc from "Hoc/navigatorHoc";
import translatorHoc from "Hoc/translatorHoc";
import { connect } from "react-redux";

class SubscriptionPaymentFailurePage extends Component {
  componentDidMount() {
    const { navigateTo } = this.props;
    setTimeout(() => {
      navigateTo("customer-onboard");
    }, 10000);
  }
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
            {translate("subscription_failure.payment")}
          </div>
          <div className={styles.description}>
            {translate("subscription_failure.description")}
          </div>
          <CapsuleButton>
            {translate("subscription_failure.retry")}
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
