import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./payment_failure.module.scss";
import CapsuleButton from "CommonComponents/capsuleButton";
import navigatorHoc from "Hoc/navigatorHoc";

class SubscriptionPaymentFailurePage extends Component {
  componentDidMount() {
    const { navigateTo, showSuccessFlashMessage } = this.props;
    setTimeout(() => {
      navigateTo("customer-onboard");
    }, 10000);
  }
  render() {
    return (
      <FullWidthContainer>
        <DivColumn
          verticalCenter
          horizontalCenter
          className={styles.page_container}
        >
          <div className={styles.title}>Payment Failed</div>
          <div className={styles.description}>Redirecting</div>
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

export default navigatorHoc(SubscriptionPaymentFailurePage);
