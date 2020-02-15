import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./pricing.module.scss";
import Subscription from "CommonComponents/subscriptionComponent";

class Pricing extends Component {
  render() {
    const { subscriptionPlanList, isRTL } = this.props;

    return (
      <DivRow fillParent className={styles.subscription_container}>
        {map(subscriptionPlanList, (subscription, index) => {
          return (
            <Subscription
              subscription={subscription}
              features={subscription.features}
              isSelected={subscription.isSelected}
            />
          );
        })}
      </DivRow>
    );
  }
}

export default navigatorHoc(Pricing);
