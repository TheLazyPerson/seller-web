import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./payment_failure.module.scss";
import CapsuleButton from "CommonComponents/capsuleButton";
import navigatorHoc from "Hoc/navigatorHoc";
import SectionedContainer from "CommonContainers/sectionedContainer";
import SideNav from "CommonComponents/sideNav";

class ProfileSubscriptionPaymentFailurePage extends Component {
  render() {
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
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
      </SectionedContainer>
    );
  }
}

export default navigatorHoc(ProfileSubscriptionPaymentFailurePage);
