import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./pricing.module.scss";
import Subscription from "CommonComponents/subscriptionComponent";
import CapsuleButton from "CommonComponents/capsuleButton";

class Pricing extends Component {
  render() {
    const { subscriptionPlanList } = this.props;

    return (
      <DivColumn>
        <DivRow fillParent className={styles.subscription_container}>
          {map(subscriptionPlanList, (subscription, index) => {
            return (
              <Subscription
                subscription={subscription}
                isSelected={subscription.isSelected}
              />
            );
          })}
        </DivRow>
        <CapsuleButton className={styles.capsule_button}>
          Get Started
        </CapsuleButton>
      </DivColumn>
    );
  }
}

export default navigatorHoc(Pricing);
