import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./payment_failure.module.scss";
import InputTextComponent from "CommonComponents/InputTextComponent";
import InputCheckbox from "CommonComponents/InputCheckbox";
import CapsuleButton from "CommonComponents/capsuleButton";
import navigatorHoc from "Hoc/navigatorHoc";
import queryString from "query-string";
import SectionedContainer from "CommonContainers/sectionedContainer";
import SideNav from "CommonComponents/sideNav";

class ProfileSubscriptionPaymentFailurePage extends Component {
  render() {
    const parsed = queryString.parse(this.props.location.search);

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
