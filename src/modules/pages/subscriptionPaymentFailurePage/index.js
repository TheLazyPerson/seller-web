import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./payment_failure.module.scss";
import CapsuleButton from "CommonComponents/capsuleButton";
import navigatorHoc from "Hoc/navigatorHoc";

class SubscriptionPaymentFailurePage extends Component {
  render() {
    return (
      <FullWidthContainer>
        <DivColumn
          verticalCenter
          horizontalCenter
          className={styles.page_container}
        >
          <div className={styles.title}>Payment Failed</div>
          <div className={styles.description}>
            There was problem while accepting your payment.
          </div>
          <CapsuleButton>Retry</CapsuleButton>
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

export default navigatorHoc(SubscriptionPaymentFailurePage);
