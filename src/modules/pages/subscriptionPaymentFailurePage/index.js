import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./payment_failure.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import InputCheckbox from "CommonComponents/InputCheckbox";
import CapsuleButton from "CommonComponents/capsuleButton";
import navigatorHoc from "Hoc/navigatorHoc";
import queryString from "query-string";

class SubscriptionPaymentFailurePage extends Component {
  render() {
    const parsed = queryString.parse(this.props.location.search);

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
